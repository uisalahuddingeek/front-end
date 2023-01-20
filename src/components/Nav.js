import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Nav = () => {
    const auth = localStorage.getItem('token');
    const navigate = useNavigate();
    const logOut = () =>{
        localStorage.clear();
        navigate('/signup');
    }
 return(
    <div className="navigation-section">
        {
            auth ? 
            <ul>
            <li><Link to="/">Product</Link></li>
            <li><Link to="/add-product">Add Product</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/signup" onClick={logOut}>LogOut ({JSON.parse(auth).name})</Link></li>
            </ul>
            :
            <ul>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        }
    </div>
 )
}

export default Nav;