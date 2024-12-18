import React, { useEffect, useState } from 'react';
import axios from "axios"
import Dashboard from './dashboard/dashboard';
import HomePage from './homepage/homepage';
import { HashRouter,Route,Routes } from 'react-router-dom';
export const userContext=React.createContext();

function App() {

  const [user,setUser]=useState()

  useEffect(()=>{
    axios.get("http://localhost:5000/session",{withCredentials:true})
    .then((response)=>{
      setUser(response.data.email);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div>
      <HashRouter>
      <userContext.Provider value={user}>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        
        </Routes>
        </userContext.Provider>
      </HashRouter>
    </div>

  );
}

export default App;