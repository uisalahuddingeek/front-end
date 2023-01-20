import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () =>{
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("")
    useEffect(()=>{
        getProductsDetails();
    },[]);

    const getProductsDetails = async()=>{
        let result = await fetch('http://localhost:8000/products',{
            headers : {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        setProducts(result);
        console.log("List Data", result);
    }
    const delectProduct = async (id)=>{
        console.log("delete id", id);
        let result = await fetch(`http://localhost:8000/product/${id}`,{
            method : "Delete",
            headers : {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
            alert("Product Delected");
        }
        getProductsDetails();
    }
    const searchHandler = async (event) =>{
        let key = event.target.value;
        if(key){
            let result = await fetch(`http://localhost:8000/search/${key}`,{
                headers : {
                    authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            if(result){
                setProducts(result);
            }
        }else{
            getProductsDetails();
        }
    }
    return(
        <div className="product-list-section">
            <input type="text" className="inputBox" onChange={searchHandler} placeholder="Search Product"></input>
            <h3>Product List</h3>
            <ul>
                <li>Sr. No.</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Delete</li>
                <li>Update</li>
            </ul>
            {
                products.map((item,index)=>{
                    return <ul>
                        <li>{index+1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        <li><button type="button" onClick={()=>delectProduct(item._id)}>Delete</button></li>
                        <li><Link to={`/update/${item._id}`}>Update</Link></li>
                    </ul>
                })
            }
        </div>
    )
}
export default ProductList;