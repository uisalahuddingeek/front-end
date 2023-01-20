import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () =>{
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    }, [])
    const handleLogin = async ()=>{
        let result = await fetch('http://localhost:8000/login',{
            method : 'post',
            body : JSON.stringify({email, password}),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        if(result.token){
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.token));
            navigate('/');
        }else{
            alert("please enter correct details!")
        }
        
    }
    return(
        <div className="form-section">
            <h1>Login Form</h1>
            <input type="text" className="inputBox" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email"></input>
            <input type="text" className="inputBox" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password"></input>
            <button className="appButton" onClick={handleLogin} type="button">Login</button>
        </div>
    )
}

export default Login;