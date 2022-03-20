import { useEffect, useState, useRef } from "react";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from 'react-toastify';

function AddProduct() {
    const nameRef = useRef(); 
    const priceRef = useRef();
    const categoryRef = useRef();
    const { t } = useTranslation();
    const [category, setCategory] = useState([]);

    const imgSrcRef = useRef();
    const descriptionRef = useRef();
    const barcodeRef = useRef();

    const [message, setMessage] = useState("");
    // const [warningMessage, setWarningMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch("https://webshop1234.herokuapp.com/category")
        .then(res => res.json())
        .then(data => {
            setCategory(data)
        });
    
        },[]);

    function addToDatabase() {
        const newProduct = {
            name: nameRef.current.value,
            price: priceRef.current.value,
            category: {id:categoryRef.current.value},
            imgSrc: imgSrcRef.current.value,
            description: descriptionRef.current.value,
            barcode: barcodeRef.current.value,
            quantity:0,
            active: false
        }

        fetch("https://webshop1234.herokuapp.com/products",{
            method: "POST",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type":"application/json",
                "Authorization": "Bearer " + sessionStorage.getItem("token"
            }
        }).then(res => {
            console.log(res);
            if (res.status === 201) {
                toast.success("Toode edukalt lisatud!");
            } else {
                return res.json(); 
            }
        }) // responseEntity
        .then(data => {
            toast.error(data.message);
        }) // body
    }

    return (
    <div>
        <ToastContainer />
        {/* {message && <Alert variant="success">{message}</Alert>}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>} */}
        <Form.Label>{t("product.name")}</Form.Label> <br />
        <Form.Control placeholder={t("product.product-name")} ref={nameRef} /> <br />
        <Form.Label>{t("product.price")}</Form.Label> <br />
        <Form.Control placeholder={t("product.product-price")} ref={priceRef} /> <br />
        <Form.Label>{t("product.category")}</Form.Label> <br />
        {/* <Form.Control placeholder={t("product.product-category")} ref={categoryRef} /> <br /> */}
        <Form.Select ref={categoryRef}>{
        category.map(category => 
            <option value={category.id}>{category.name}</option> )
        }
        </Form.Select>
        <Form.Label>Pildi URL</Form.Label> <br />
        <Form.Control placeholder="Pildi URL aadress" ref={imgSrcRef} /> <br />
        <Form.Label>Kirjeldus</Form.Label> <br />
        <Form.Control placeholder="Toote pikem kirjeldus" ref={descriptionRef} /> <br />
        <Form.Label>Ribakood</Form.Label> <br />
        <Form.Control placeholder="Unikaalne ribakood" ref={barcodeRef} /> <br />
        <div className="center">
            <Button variant="dark" onClick={addToDatabase}>{t("product.add-button")}</Button>
        </div>
    </div>)
}

export default AddProduct;