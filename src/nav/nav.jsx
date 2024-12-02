import React from "react";
import "./nav.css"
import logo from "../images/logo.png"
export default function Nav(){
    function handleSignin(){
        window.location.href="http://localhost:5000/auth/google"
    }

    return <div className="nav-main">
        <section className="nav-body">
        <img src={logo} alt="" />
            <button onClick={handleSignin}>Sign In</button>
        </section>
    </div>
}