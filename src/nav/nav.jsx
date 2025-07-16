import React,{useEffect} from "react";
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

    return <div className="bg-purple-900 flex justify-between items-center font-semibold text-lg shadow-black shadow-2xl">
        <div className="flex justify-center items-center">
            <img className="w-auto h-[5em]" src={logo} alt="unidocs logo"/>
            <h4 className="text-white">UniDocs</h4>        
        </div>

        <a className="text-white no-underline bg-purple-700 rounded-md p-2 items-center justify-center text-lg font-semibold mr-4 cursor-pointer" onClick={handleSignin}>Sign In</a>
    </div>
}