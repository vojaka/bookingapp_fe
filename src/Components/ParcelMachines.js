import { useState, useEffect } from "react";

import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

function ParchelMachines() {
  const [parcelMachines, updateParcelMachines] = useState([]);
  const [country, updateCountry] = useState("EE");
  const [chosenParcelMachine, updateChosenParcelMachine] = useState(null);

  // useEffect(() => 
  //   fetch("https://www.omniva.ee/locations.json")
  //   .then(response => {
  //       return response.json();
  //   })
  //   .then(object => {
  //       updateParcelMachines(object);
  //   }), []
  // );

  useEffect(() => 
    fetch("https://webshop1234.herokuapp.com/locations")
    .then(response => {
        return response.json();
    })
    .then(object => {
        updateParcelMachines(object);
    }), []
  );

  return (
    <div>   
           { chosenParcelMachine !== null && <div>
              <div>Valitud pakiautomaat: {chosenParcelMachine} </div>
              <button onClick={() => updateChosenParcelMachine(null)}>X</button>
            </div>}   
          { chosenParcelMachine === null && <div> 
            <button onClick={() => updateCountry("EE")}>EE</button>
            <button onClick={() => updateCountry("LV")}>LV</button>
            <button onClick={() => updateCountry("LT")}>LT</button>
            <DropdownButton id="dropdown-basic-button" title="Vali pakiautomaat">
                {parcelMachines.filter(element => element.A0_NAME === country)
                      .map(element => <Dropdown.Item onClick={() => updateChosenParcelMachine(element.NAME)} key={element.ZIP}>{element.NAME}</Dropdown.Item>)}
            </DropdownButton>
          </div>}
    </div>);
}

export default ParchelMachines;