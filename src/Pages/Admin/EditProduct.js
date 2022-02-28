import { useState, useRef, useEffect } from "react";
import {useParams} from "react-router"
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useTranslation } from "react-i18next";

function EditProduct() {
    const {id} = useParams();
    const { t } = useTranslation();
    
    
    const nameRef = useRef();
    const priceRef = useRef();
    const imgSrcRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const barcodeRef = useRef();
    const quantityRef = useRef();
    const activeRef = useRef();
    //const [errorMessage,setErrorMessage] = useState("");
    

    const [product, updateProduct] = useState(null);
    
    useEffect(()=>{
        fetch("https://webshop1234.herokuapp.com/products/" + id)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            } else {
                throw new Error(res.json());
            }
        })
        .then(data => updateProduct(data))
        .catch(error => console.log(error));
    },[id]);


    function onEditProduct(){

        const newProduct = {
                    id:product.id,
                    name: nameRef.current.value,
                    price: priceRef.current.value,
                    category: categoryRef.current.value,
                    imgSrc: imgSrcRef.current.value,
                    description: descriptionRef.current.value,
                    barcode: barcodeRef.current.value,
                    quantity: quantityRef.current.value,
                    active: activeRef.current.value
                }

        fetch("https://webshop1234.herokuapp.com/product/" + product.id,{
            method: "PUT",
            body: JSON.stringify(newProduct),
            headers: {
                "Content-Type":"application/json"
            }
        })
    }
    
    return (
    <div className = "center">
       {product && <div>
            <div>  
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.category.name}</div>
            </div>
            <div>
                <Form.Label>{t("product.name")}</Form.Label> <br />
                <Form.Control placeholder={t("product.product-name")} ref={nameRef} defaultValue={product.name} /> <br />
                <Form.Label>{t("product.price")}</Form.Label> <br />
                <Form.Control placeholder={t("product.product-price")} ref={priceRef} defaultValue={product.price} /> <br />
                <Form.Label>{t("product.category")}</Form.Label> <br />
                <Form.Control placeholder={t("product.product-category")} ref={categoryRef} defaultValue={product.category.name} /> <br />
                <Form.Label>Pildi URL</Form.Label> <br />
                <Form.Control placeholder="Pildi URL aadress" ref={imgSrcRef} defaultValue={product.imgSrc} /> <br />
                <Form.Label>Kirjeldus</Form.Label> <br />
                <Form.Control placeholder="Toote pikem kirjeldus" ref={descriptionRef} defaultValue={product.description} /> <br />
                <Form.Label>Ribakood</Form.Label> <br />
                <Form.Control placeholder="Unikaalne ribakood" ref={barcodeRef} defaultValue={product.barcode} /> <br />          
                <Form.Label>Kogus</Form.Label> <br />
                <Form.Control placeholder="Toote kogus" ref={quantityRef} defaultValue={product.quantity} /> <br />
                <Form.Label>Aktiivne</Form.Label> <br />
                <input type = "checkbox" placeholder="toote aktiivsus" ref={activeRef} defaultChecked={product.isActive} /> <br />          
                <div className="center">
                    <Button onClick={() => onEditProduct()} variant="dark">{t("product.edit-button")}</Button>
                </div>
            </div>
       </div>}
       { !product && <div>Toodet ei leitud</div>}
    </div>
        )
}


export default EditProduct;