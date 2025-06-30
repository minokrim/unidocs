import React,{ useState,useEffect, createContext,useRef } from "react";
import axios from "axios";
export const userContext=createContext();

export default function UserProvider({children}){
    const [user,setUser]=useState({})
    const [loading,setloading]=useState(true)
    const user_id=useRef(null)

    useEffect(() => {
      refreshUser(); // fetch once on mount
    }, []);

    const refreshUser = () => {
      axios.get("http://localhost:5000/database/details", { withCredentials: true })
        .then((response) => {
          setUser(response.data);
          console.log(response.data.id)
          user_id.current=response.data.id;
        })
        .catch((err) => {
          console.log("Error fetching user:", err);
        })
        .finally(() => {
          setloading(false);
        });
    };

    return <userContext.Provider value={{user,setUser,loading,refreshUser,user_id}}>
    {children}
    </userContext.Provider>
}