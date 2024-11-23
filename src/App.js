import './App.css';
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
    <userContext.Provider value={user}>
          <Home/>
    </userContext.Provider>
  );
}

export default App;
