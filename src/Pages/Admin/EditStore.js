import { useState, useRef, useEffect } from "react";
import {useParams} from "react-router"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function EditStore() {
    const {id} = useParams();
    const { t } = useTranslation();

    const nameRef = useRef();
    const addressRef = useRef();
    const openHoursRef = useRef();

    

    const [store, updateStore] = useState(null);
    
    useEffect(()=>{
        fetch("https://webshop1234.herokuapp.com/store/" + id)
        .then(res => res.json())
        .then(data => updateStore(data));
    },[id]);


    function onEditStore(){

        const newStore = {
                    id:store.id,
                    name: nameRef.current.value,
                    address: addressRef.current.value,
                    openHours: openHoursRef.current.value,
                }

        fetch("https://webshop1234.herokuapp.com/store/" + store.id,{
            method: "PUT",
            body: JSON.stringify(newStore),
            headers: {
                "Content-Type":"application/json"
            }
        })
    }
    
    return (
    <div className = "center">
       {store && <div>
            {/* <div>  
                <div>{store.name}</div>
                <div>{store.address}</div>
                <div>{store.openHours}</div>
            </div> */}
            <div>
            <Form.Label>{t("store.name")}</Form.Label> <br />
            <Form.Control placeholder={t("store.store-name")} ref={nameRef} defaultValue={store.name}/> <br />
            <Form.Label>{t("store.address")}</Form.Label> <br />
            <Form.Control placeholder={t("store.store-address")} ref={addressRef} defaultValue={store.address}/> <br />
            <Form.Label>{t("store.openHours")}</Form.Label> <br />
            <Form.Control placeholder={t("store.store-openHours")} ref={openHoursRef} defaultValue={store.openHours}/> <br />           
                <div className="center">
                    <Button onClick={() => onEditStore()} variant="dark">{t("product.edit-button")}</Button>
                </div>
            </div>
       </div>}
       { !store && <div>Toodet ei leitud</div>}
    </div>
        )
}


export default EditStore;