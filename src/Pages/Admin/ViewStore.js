import { useEffect,useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewStore() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [store, updateProducts] = useState([]);
    const [originalProducts, updateOriginalProducts] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        fetch("https://webshop1234.herokuapp.com/store")
        .then(res => res.json())
        .then(body => {
            updateProducts(body)
            updateOriginalProducts(body);
        });
    
        },[]);

    function searchProduct() {
        let productsFound = [];
        console.log(originalProducts);
        console.log(searchRef.current.value);
        originalProducts.forEach(product => {
            if (product.name.toUpperCase().indexOf(searchRef.current.value.toUpperCase()) > -1
                || product.barcode.toString().indexOf(searchRef.current.value) > -1 ) {
                productsFound.push(product);
            }
        })
        updateProducts(productsFound);
    }

    function onDeleteProduct(product) {
        fetch("https://webshop1234.herokuapp.com/store/" + product.id, {
            method: "DELETE"
        })
        .then(res => res.json()) 
        .then(data => {
            updateProducts(data)
            updateOriginalProducts(data);
        });
    }

    
    return (<div>
        <h2 className="mb-4">store</h2>
        <input onKeyUp={searchProduct} ref={searchRef} type="text" />
  <table className="table table-hover table-bordered">
    <thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Aadress</th>
      <th scope="col">openHours</th>
      <th scope="col">Actions</th>
    </tr>
    </thead>
    <tbody>
    {store.map(store => <tr>
      <td>{store.name}</td>
      <td>{store.address}</td>
      <td>{store.openHours}</td>
      <td>
          <Button onClick={() => onDeleteProduct(store)} variant="danger">X</Button>
          <Link to={"/admin/muudaStore/" + store.id}>
            <Button variant="warning">Edit</Button>
          </Link>
      </td>
    </tr>)}

    
    </tbody>
  </table>
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
            <Modal.Title>Hoiatus</Modal.Title>
            </Modal.Header>
            <Modal.Body>Oled kustutamas kõiki tooteid andmebaasist!</Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Katkesta
            </Button>
            <Button variant="primary">
                Jah kustuta kõik tooted
            </Button>
            </Modal.Footer>
        </Modal>
        <br />
        <Button variant="danger" onClick={handleShow}>Kustuta kõik tooted andmebaasist</Button>
        <br /><br />
        
    </div>)
}

export default ViewStore;