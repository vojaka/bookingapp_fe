import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    EN: {
      translation: {
        "navbar": {
          "admin-link": "Administration view",
          "cart-link": "Cart"
        },
        "home": {
          "add-cart-button": "Add to cart",
          "sort-az": "Sort A-Z",
          "sort-za": "Sort Z-A",
          "sort-price-asc": "Sort price ascending",
          "sort-price-desc": "Sort price descending"
        },
        "product": {
          "name": "Name",
          "model": "Model",
          "description": "Description",
          "price": "Price",
          "code": "Productcode",
          "category": "Category",
          "product-name": "Product name",
          "product-model": "Product model",
          "product-description": "Product description",
          "product-price": "Product price",
          "product-code": "Product code",
          "product-category": "Product category",
          "add-button": "Add product",
          "edit-button": "Edit product",
          "product-not-found": "Product not found"
        },
        "admin": {
          "add-product": "Add product",
          "change-products": "Change products",
          "change-product-button": "Edit",
          "delete-product-button": "Delete"
        }
      }
    },
    EE: {
      translation: {
        "navbar": {
          "admin-link": "Administraatori vaatesse",
          "cart-link": "Ostukorv"
        },
        "home": {
          "add-cart-button": "Lisa ostukorvi",
          "sort-az": "Sorteeri A-Z",
          "sort-za": "Sorteeri Z-A",
          "sort-price-asc": "Sorteeri hind kasvavalt",
          "sort-price-desc": "Sorteeri hind kahanevalt"
        },
        "product": {
          "name": "Nimetus",
          "model": "Mudel",
          "description": "Kirjeldus",
          "price": "Hind",
          "code": "Tootekood",
          "category": "Kategooria",
          "product-name": "Toote nimetus",
          "product-model": "Toote mudel",
          "product-description": "Toote kirjeldus",
          "product-price": "Toote hind",
          "product-code": "Toote tootekood",
          "product-category": "Toote kategooria",
          "add-button": "Lisa toode",
          "edit-button": "Muuda toode",
          "product-not-found": "Toodet ei leitud"
        },
        "admin": {
          "add-product": "Lisa toode",
          "change-products": "Halda tooteid",
          "change-product-button": "Muuda",
          "delete-product-button": "Kustuta"
        }
      }
    },
    RU: {
      translation: {
        "navbar": {
          "admin-link": "RU Administraatori vaatesse",
          "cart-link": "RU Ostukorv"
        },
        "home": {
          "add-cart-button": "RU Lisa ostukorvi",
          "sort-az": "RU Sorteeri A-Z",
          "sort-za": "RU Sorteeri Z-A",
          "sort-price-asc": "RU Sorteeri hind kasvavalt",
          "sort-price-desc": "RU Sorteeri hind kahanevalt"
        },
        "product": {
          "name": "RU Nimetus",
          "model": "RU Mudel",
          "description": "RU Kirjeldus",
          "price": "RU Hind",
          "code": "RU Tootekood",
          "category": "RU Kategooria",
          "product-name": "RU Toote nimetus",
          "product-model": "RU Toote mudel",
          "product-description": "RU Toote kirjeldus",
          "product-price": "RU Toote hind",
          "product-code": "RU Toote tootekood",
          "product-category": "RU Toote kategooria",
          "add-button": "RU Lisa toode",
          "edit-button": "RU Muuda toode",
          "product-not-found": "RU Toodet ei leitud"
        },
        "admin": {
          "add-product": "RU Lisa toode",
          "change-products": "RU Halda tooteid",
          "change-product-button": "RU Muuda",
          "delete-product-button": "RU Kustuta"
        }
      }
    }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: localStorage.getItem("language"), 
    fallbackLng: "EE",
    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;