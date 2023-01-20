import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () =>{
const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [category, setCategory] = useState("")
const [company, setCompany] = useState("");
const navigate = useNavigate();
const addProductData = async ()=>{
        let userId = JSON.parse(localStorage.getItem('user'))._id;
        let result = await fetch('http://localhost:8000/add-product',{
            method : 'post',
            body : JSON.stringify({name, price, category, company, userId}),
            headers : {
                'Content-Type' : 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log("product saved", result);
        navigate('/')
}
return (
    <div className="add-product-section">
        <form>
            <input type="text" className="inputBox" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Name"></input>
            <input type="text" className="inputBox" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="Enter price"></input>
            <input type="text" className="inputBox" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Enter category"></input>
            <input type="text" className="inputBox" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder="company name"></input>
            <button className="appButton" onClick={addProductData} type="button">Send</button>
        </form>
    </div>
)
}
export default AddProduct;