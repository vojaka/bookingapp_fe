import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { useTranslation } from 'react-i18next';

import { cartSumService } from '../Services/CartSumService'; 

function NavigationBar() {
    const { t, i18n } = useTranslation();
    const [cartSum, updateCartSum] = useState(0);

    useEffect(() => {
        let sumOfCart = 0;
        if (sessionStorage.getItem("cartItems")) {
            let cartProducts = JSON.parse(sessionStorage.getItem("cartItems"));
            cartProducts.forEach(product => sumOfCart = sumOfCart + product.cartProduct.price * product.quantity);
        }
        updateCartSum(sumOfCart)
       }, [] 
    );

    cartSumService.getCartSum().subscribe(cartSumFromObs => 
        updateCartSum(cartSumFromObs)
    )


    function changeLanguage(language) {
        i18n.changeLanguage(language);
    }

    return(
    <Navbar bg="dark" variant="dark">
        <Container>
            <Navbar.Brand as={Link} to="/">Webshio</Navbar.Brand>
            <Nav className="me-auto">
                <Nav.Link as={Link} to="/admin">{t("navbar.admin-link")}</Nav.Link>
            </Nav>
            {/* <Nav className="me-auto">
                <Nav.Link as={Link} to="/AboutUs">{t("navbar.admin-link")}</Nav.Link>
            </Nav> */}
            <Nav.Link onClick={() => changeLanguage('EE')}>
                <img className="flag" alt="" src="/language-flags/estonia.png" />
            </Nav.Link>
            <Nav.Link onClick={() => changeLanguage('EN')}>
                <img className="flag" alt="" src="/language-flags/united-kingdom.png" />
            </Nav.Link>
            <Nav.Link onClick={() => changeLanguage('RU')}>
                <img className="flag" alt="" src="/language-flags/russia.png" />
            </Nav.Link>
            <div className="cart-sum">{cartSum} €</div>
            <Nav.Link as={Link} to="/ostukorv">{t("navbar.cart-link")}</Nav.Link>
        </Container>
    </Navbar>
    )
}

export default NavigationBar;