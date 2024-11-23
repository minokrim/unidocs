<<<<<<< HEAD
import logo from './logo.svg';
import '../App.css';
import Home from './home/home';
import NavDash from './dashboard/navdash';
function App() {
  return (
   <div>
    <NavDash />
    

   </div>
  )
=======
import './App.css';
import Dashboard from './dashboard/dashboard';
import Home from './home/home';
import React, { useEffect, useState } from 'react';
import axios from "axios"

export const userContext=React.createContext();


function App() {

  const [user,setuser]=useState(null)

  useEffect(()=>{
    axios.get("http://localhost:5000/session",{withCredentials:true})
    .then((response)=>{
      setuser(response.data.email);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div>
          <userContext.Provider value={user}>
          {/* <Home/> */}
          <Dashboard/>
    </userContext.Provider>
    </div>

  );
>>>>>>> 08922bef6ddf665b3fc9c55739a966ee526da8a5
}

