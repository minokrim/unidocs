import React from "react";
import "./navs.css"
import logo from "../images/logo.png"
export default function Nav(){
    function handleSignin(){
        window.location.href="http://localhost:5000/auth/google"
    }

    return <div className="nav-main">
      {/*   <section className="nav-body">
            <div className="logg">
        <img className="" src={logo} alt="" />
        <h4>UniDocs</h4>
        </div>
            <button onClick={handleSignin}>Sign In</button>
        </section> */}
        <div className="nav-bar">
            <div className="logo-con">
            <img className="logo" src={logo} alt="" />
            <h4 className="mt-2 text-white">UniDocs</h4>
            </div>
            <div className="cons">
        
        <a className="anchor ms-4" href="">Sign Up</a>
        
            </div>

        </div>
    </div>
}