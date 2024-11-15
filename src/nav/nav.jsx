import React from "react";
import "./nav.css"
import logo from "../images/logo.png"
export default function Nav(){
    return <div className="nav-main">
        <section className="nav-body">
        <img src={logo} alt="" />
            <input type="search" name="" id="" />
            <button>Sign In</button>
        </section>
    </div>
}