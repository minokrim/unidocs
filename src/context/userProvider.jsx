import React,{ useState,useEffect, createContext } from "react";
import axios from "axios";
export const userContext=createContext();

export default function UserProvider({children}){
    const [user,setUser]=useState({})
    const [loading,setloading]=useState(true)

    useEffect(() => {
      refreshUser(); // fetch once on mount
    }, []);

    const refreshUser = () => {
      axios.get("http://localhost:5000/database/details", { withCredentials: true })
        .then((response) => {
          setUser(response.data);
        })
        .catch((err) => {
          console.log("Error fetching user:", err);
        })
        .finally(() => {
          setloading(false);
        });
    };

    return <userContext.Provider value={{user,setUser,loading,refreshUser}}>
    {children}
    </userContext.Provider>
}