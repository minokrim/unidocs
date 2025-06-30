import React,{useEffect} from "react";
import "./navs.css"
import logo from "../images/logo.png"
import { useNavigate } from "react-router-dom";

export default function Nav(){
      const navigate = useNavigate();

    function handleSignin(){
    localStorage.removeItem('jwtToken');
        window.location.href="http://localhost:5000/auth/google"
    }

    useEffect(() => {
    const handleAuthCallback = () => {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);
      const token = params.get('token');

      if (token) {
        localStorage.setItem('jwtToken', token);
        
        window.history.pushState({}, document.title, window.location.pathname);
        
        navigate('/app');
      }
      else{
        navigate('/')
      }
    };

    handleAuthCallback();
  }, [navigate]);

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