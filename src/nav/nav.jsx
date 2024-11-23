import React from "react";
import "./nav.css"
import logo from "../images/logo.png"
// import axios from "axios"
export default function Nav(){
    function handleSignin(){
        window.location.href="http://localhost:5000/auth/google"
    }

    return <div className="nav-main">
        <section className="nav-body">
        <img src={logo} alt="" />
            <input type="search" name="" id="" />
            <button onClick={handleSignin}>Sign In</button>
        </section>
    </div>
}