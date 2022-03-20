import { useEffect, useState } from "react";

function Order () {
  // https://reactmihkelfrontend.heroku.app/tellimus?order_reference=120202&payment_reference=4fe0c2b65d355ef9c72ce51103f6208f5290e0c105d76138f4a6abb59fadf65e
  const [message, setMessage] = useState("");
  const url = window.location.href;
  const orderReference = url.split("order_reference=")[1].split("&")[0];
  const paymentReference = url.split("payment_reference=")[1];

  useEffect(() => {
    fetch("https://webshop1234.herokuapp.com/check-payment",
    {
      method: "POST",
      body: JSON.stringify({
        order_reference: Number(orderReference),
        payment_reference: paymentReference
      }),
      headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + sessionStorage.getItem("token")
      }
    }).then(response => {
      return response.json();
      })
      .then(paymentState => {
        if (paymentState === "settled") {
          setMessage("Edukalt makse õnnestus")
        } else {
          setMessage("Makse ei õnnestunud")
        }
      });
  },[orderReference, paymentReference])

  return (<div>{message}</div>)
}

export default Order;