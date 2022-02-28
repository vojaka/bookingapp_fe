import { useState, useEffect } from "react";
import {useParams} from "react-router"
import { useTranslation } from 'react-i18next';

function SingleProduct() {
    const {id} = useParams();

    const { t } = useTranslation();
    const [product, updateProduct] = useState(null);

    useEffect(()=>{
        fetch("https://webshop1234.herokuapp.com/products/" + id)
        .then(res => {
            if (res.status === 200) {
                return res.json()
            }
        })
        .then(data => updateProduct(data));
    },[id]);

    return (
        <div>      
            { product && <div>
                <div>{product.name}</div>
                <div>{product.price}</div>
                <div>{product.category.name}</div>
                <div>{product.id}</div>
            </div>}
            { !product && <div>{t("product-not-found")}</div>}
        </div>)
}

export default SingleProduct;