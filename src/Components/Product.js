import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';

import { cartSumService } from '../Services/CartSumService';

function Product(props) {
    const { t } = useTranslation();
             
    function onAddToCart(product) {
        let products = [];
        if (sessionStorage.getItem("cartItems")) {
            products = JSON.parse(sessionStorage.getItem("cartItems"));
            const index = products.findIndex(prod => prod.cartProduct.id === product.id);
            if (index === -1) {
                products.push({cartProduct: product, quantity: 1});
            } else {
                products[index].quantity++;
            }
            sessionStorage.setItem("cartItems",JSON.stringify(products));
        } else {
            products.push({cartProduct: product, quantity: 1});
            sessionStorage.setItem("cartItems",JSON.stringify(products));
        }
        let sumOfCart = 0;
        products.forEach(product => sumOfCart = sumOfCart + product.cartProduct.price * product.quantity);
        cartSumService.sendCartSum(sumOfCart);
    }

    return (
    <div>
        <Link to={"toode/" + props.prod.id}>
            <div>{props.prod.name}</div>
            <div>{props.prod.price}</div>
            <div>{props.prod.category.name}</div>
        </Link>
        <Button onClick={() => onAddToCart(props.prod)}>{t("home.add-cart-button")}</Button>
    </div>)
}

export default Product;