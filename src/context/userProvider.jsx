import React,{ useState,useEffect, createContext } from "react";
import axios from "axios";
export const userContext=createContext();

export default function UserProvider({children}){
    const [user,setUser]=useState([])
    const [loading,setloading]=useState(true)

    useEffect(()=>{
      axios.get("http://localhost:5000/database/details",{withCredentials:true})
      .then((response)=>{
        setUser(response.data.rows[0]);
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        setloading(false)
      })
    },[])

    return <userContext.Provider value={{user,loading}}>
    {children}
    </userContext.Provider>
}