import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () =>{
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    useEffect(()=>{
        const auth = localStorage.getItem('token');
        if(auth){
            navigate('/');
        }
    }, [])
    const collectData = async ()=>{
        console.log(name,password,email);
        let result = await fetch('http://localhost:8000/register',{
            method : 'post',
            body : JSON.stringify({name, email, password}),
            headers : {
                'Content-Type' : 'application/json'
            }
        });
        result = await result.json();
        console.log("get data", result);
        localStorage.setItem('user', JSON.stringify(result.result));
        localStorage.setItem('token', JSON.stringify(result.token));
        navigate('/');
    }
    return(
        <div className="form-section">
            <h1>Registration Form</h1>
            <input type="text" className="inputBox" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Name"></input>
            <input type="text" className="inputBox" onChange={(e)=>setPassword(e.target.value)} value={password} placeholder="Enter password"></input>
            <input type="text" className="inputBox" onChange={(e)=>setEmail(e.target.value)} value={email} placeholder="Enter Email"></input>
            <button className="appButton" onClick={collectData} type="button">SignUp</button>
        </div>
    )
}

export default SignUp;