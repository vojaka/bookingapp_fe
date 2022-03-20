import { useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function AddStore() {
    const nameRef = useRef(); 
    const addressRef = useRef();
    const openHoursRef = useRef();
    const { t } = useTranslation();

    function addToDatabase() {
        const newStore = {
            name: nameRef.current.value,
            address: addressRef.current.value,
            openHours: openHoursRef.current.value,
        }

        fetch("https://webshop1234.herokuapp.com/store",{
            method: "POST",
            body: JSON.stringify(newStore),
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token")
            }
        })
    }

    return (
    <div>
        <Form.Label>{t("store.name")}</Form.Label> <br />
        <Form.Control placeholder={t("store.store-name")} ref={nameRef} /> <br />
        <Form.Label>{t("store.address")}</Form.Label> <br />
        <Form.Control placeholder={t("store.store-address")} ref={addressRef} /> <br />
        <Form.Label>{t("store.openHours")}</Form.Label> <br />
        <Form.Control placeholder={t("store.store-openHours")} ref={openHoursRef} /> <br />
        
        <div className="center">
            <Button variant="dark" onClick={addToDatabase}>{t("store.add-button")}</Button>
        </div>
    </div>)
}

export default AddStore;