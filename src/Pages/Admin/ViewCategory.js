import { useEffect,useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewCategory() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [category, updateCategory] = useState([]);
    const [originalCategory, updateOriginalCategory] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        fetch("https://webshop1234.herokuapp.com/category")
        .then(res => res.json())
        .then(body => {
            updateCategory(body)
            updateOriginalCategory(body);
        });
    
        },[]);

    function searchCategory() {
        let categoryFound = [];
        console.log(originalCategory);
        console.log(searchRef.current.value);
        originalCategory.forEach(category => {
            if (category.name.toUpperCase().indexOf(searchRef.current.value.toUpperCase()) > -1) {
                categoryFound.push(category);
            }
        })
        updateCategory(categoryFound);
    }

    function onDeleteCategory(category) {
        fetch("https://webshop1234.herokuapp.com/category/" + category.id, {
            method: "DELETE"
        })
        .then(res => res.json()) 
        .then(data => {
            updateCategory(data)
            updateOriginalCategory(data);
        });
    }

    
    return (<div>
        <h2 className="mb-4">category</h2>
        <input onKeyUp={searchCategory} ref={searchRef} type="text" />
  <table className="table table-hover table-bordered">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
    </tr>
    </thead>
    <tbody>
    {category.map(category => <tr>
      <td>{category.id}</td>
      <td>{category.name}</td>
      <td>
          <Button onClick={() => onDeleteCategory(category)} variant="danger">X</Button>
          {/* <Link to={"/admin/muudaStore/" + store.id}>
            <Button variant="warning">Edit</Button>
          </Link> */}
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

export default ViewCategory;