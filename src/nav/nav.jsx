import React from "react";
import "./navs.css"
import logo from "../images/logo.png"
export default function Nav(){
    function handleSignin(){
        window.location.href="http://localhost:5000/auth/google"
    }

    return <div className="nav-main">
        <div className="nav-bar">
            <div className="logo-con">
            <img className="logo" src={logo} alt="" />
            <h4 className="mt-2 text-white">UniDocs</h4>
            </div>
            <div className="cons">
        
        <a className="anchor ms-4" onClick={handleSignin}>Sign In</a>
        
            </div>

        </div>
    </div>
}