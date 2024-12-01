

import React, { useEffect, useState } from 'react';
import axios from "axios"

import Dashboard from './dashboard/dashboard';
import HomePage from './homepage/homepage';

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
        {/*   <Home/> */}
          <Dashboard />
      {/*   <HomeOne /> */}
     {/*  <Cards /> */}
     {/*  <HomePage /> */}
    </userContext.Provider>
    </div>

  );
}

export default App;