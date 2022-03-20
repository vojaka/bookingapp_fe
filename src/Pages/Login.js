import {useRef } from "react"; 

function Login() {
    const emailRef = useRef(); 
    const passwordRef = useRef();

    function onLogin() {
        const loginData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
      
 fetch("https://webshop1234.herokuapp.com/login",{
            method: "POST",
            body: JSON.stringify(loginData),
            headers: {
                "Content-Type":"application/json"
            }
        }).then(res => 
            res.json()) 
        .then(data => {
            if (data.token) {
              sessionStorage.setItem("token", data.token);
            }  
        })
    }
 return ( 
    <div>
        <label>E-mail</label>
        <input type="text" ref={emailRef} />
        <label>Parool</label>
        <input type="password" ref={passwordRef} />
        <div className="center">
            <button variant="dark" onClick={onLogin}>Logi sisse</button>
        </div>
    </div>)
}

export default Login;