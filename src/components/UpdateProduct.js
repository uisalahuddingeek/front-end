import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () =>{
const [name, setName] = useState("")
const [price, setPrice] = useState("")
const [category, setCategory] = useState("")
const [company, setCompany] = useState("");
const params = useParams();
const navigate = useNavigate();
useEffect(()=>{
    console.log('url : ',params);
    getProductDetails();
},[])
const getProductDetails = async()=>{
    let result = await fetch(`http://localhost:8000/product/${params.id}`,{
        headers : {
            authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
        }
    });
    result = await result.json();
    console.log(result);
    setName(result.name);
    setPrice(result.price);
    setCategory(result.category);
    setCompany(result.company)
}
const update = async ()=>{
        let result = await fetch(`http://localhost:8000/product/${params.id}`,{
            method : 'Put',
            body : JSON.stringify({name, price, category, company}),
            headers : {
                'Content-Type' : 'application/json',
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        console.log("updated !", name, price, category, company);
        navigate('/');
        
}
return (
    <div className="add-product-section">
        <form>
            <input type="text" className="inputBox" onChange={(e)=>setName(e.target.value)} value={name} placeholder="Enter Name"></input>
            <input type="text" className="inputBox" onChange={(e)=>setPrice(e.target.value)} value={price} placeholder="Enter price"></input>
            <input type="text" className="inputBox" onChange={(e)=>setCategory(e.target.value)} value={category} placeholder="Enter category"></input>
            <input type="text" className="inputBox" onChange={(e)=>setCompany(e.target.value)} value={company} placeholder="company name"></input>
            <button className="appButton" onClick={update} type="button">Update Product</button>
        </form>
    </div>
)
}
export default UpdateProduct;