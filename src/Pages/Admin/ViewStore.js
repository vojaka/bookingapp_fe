import { useEffect,useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewLocation() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [location, updateLocation] = useState([]);
    const [timeslot, updateTimeslot] = useState([location]);
    // const [originalProducts, updateOriginalProducts] = useState([]);
    // const searchRef = useRef();

    useEffect(() => {
        fetch("http://localhost:8080/location")
        .then(res => res.json())
        .then(body => {
            updateLocation(body)
            // updateOriginalProducts(body);
        });
    
        },[]);

    useEffect(() => {
            fetch("http://localhost:8080/timeslot")
            .then(res => res.json())
            .then(body => {
                updateTimeslot(body)
                // updateOriginalProducts(body);
            });
        
            },[]);

    // function searchProduct() {
    //     let productsFound = [];
    //     console.log(originalProducts);
    //     console.log(searchRef.current.value);
    //     originalProducts.forEach(product => {
    //         if (product.name.toUpperCase().indexOf(searchRef.current.value.toUpperCase()) > -1
    //             || product.barcode.toString().indexOf(searchRef.current.value) > -1 ) {
    //             productsFound.push(product);
    //         }
    //     })
    //     updateProducts(productsFound);
    // }

    // function onDeleteProduct(product) {
    //     fetch("https://webshop1234.herokuapp.com/store/" + product.id, {
    //         method: "DELETE"
    //     })
    //     .then(res => res.json()) 
    //     .then(data => {
    //         updateProducts(data)
    //         updateOriginalProducts(data);
    //     });
    // }

    
    return (<div>
        <h2 className="mb-4">location</h2>
        {/* <input onKeyUp={searchProduct} ref={searchRef} type="text" /> */}
  <table className="table table-hover table-bordered">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">Name</th>
      <th scope="col">Address</th>
      <th scope="col">Open Time</th>
      <th scope="col">Close Time</th>
      <th scope="col">TimeSlots</th>
    </tr>
    </thead>
    <tbody>
    {location.map(location => <tr>
      <td>{location.id}</td>
      <td>{location.name}</td>
      <td>{location.longAddress}</td>
      <td>{location.locationInitialTime}</td>
      <td>{location.locationEndTime}</td>
      <td>{timeslot.filter(element => element.location_id === location.timeSlots).map(timeSlots => <tr>{timeSlots}</tr>)
      }</td>
      <td>
          {/* <Button onClick={() => onDeleteProduct(store)} variant="danger">X</Button>
          <Link to={"/admin/muudaStore/" + store.id}>
            <Button variant="warning">Edit</Button>
          </Link> */}
      </td>
    </tr>)}

    
    </tbody>
  </table>
        {/* <Modal show={show} onHide={handleClose}>
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
        <Button variant="danger" onClick={handleShow}>Kustuta kõik tooted andmebaasist</Button> */}
        <br /><br />
        
    </div>)
}

export default ViewLocation;