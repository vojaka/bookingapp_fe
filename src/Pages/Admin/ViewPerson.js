import { useEffect,useState, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ViewPerson() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [person, updatePerson] = useState([]);
    const [originalPerson, updateOriginalPerson] = useState([]);
    const searchRef = useRef();

    useEffect(() => {
        fetch("https://webshop1234.herokuapp.com/person")
        .then(res => res.json())
        .then(body => {
            updatePerson(body)
            updateOriginalPerson(body);
        });
    
        },[]);

    function searchPerson() {
        let personFound = [];
        console.log(originalPerson);
        console.log(searchRef.current.value);
        originalPerson.forEach(person => {
            if (person.firstName.toUpperCase().indexOf(searchRef.current.value.toUpperCase()) > -1) {
                personFound.push(person);
            }
        })
        updatePerson(personFound);
    }

    function onDeletePerson(person) {
        fetch("https://webshop1234.herokuapp.com/category/" + person.id, {
            method: "DELETE"
        })
        .then(res => res.json()) 
        .then(data => {
            updatePerson(data)
            updateOriginalPerson(data);
        });
    }

    
    return (<div>
        <h2 className="mb-4">category</h2>
        <input onKeyUp={searchPerson} ref={searchRef} type="text" />
  <table className="table table-hover table-bordered">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">firstName</th>
      <th scope="col">lastName</th>
    </tr>
    </thead>
    <tbody>
    {person.map(person => <tr>
      <td>{person.id}</td>
      <td>{person.firstName}</td>
      <td>{person.lastName}</td>
      <td>
          <Button onClick={() => onDeletePerson(person)} variant="danger">X</Button>
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

export default ViewPerson;