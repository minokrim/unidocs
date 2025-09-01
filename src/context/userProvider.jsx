import React,{ useState,useEffect, createContext,useRef } from "react";
import axios from "axios";
export const userContext=createContext();


export default function UserProvider({children}){
    const [user,setUser]=useState({})
    const [loading,setloading]=useState(true)
    const user_id=useRef(null)

    useEffect(() => {
      const hash = window.location.hash.substring(1);
      const queryString = hash.split('?')[1]; 
      const params = new URLSearchParams(queryString);
      const urlToken = params.get('token');
    if (urlToken) {
      localStorage.setItem("jwt", urlToken);
      window.location.hash = ""; 
    }

    refreshUser();
  }, []);

  const refreshUser = async() => {
    const storedToken = localStorage.getItem("jwt");
    if (!storedToken) {

      console.log("No stored token");
      setloading(false);
      return;
    }

        const res=await axios.get("https://unidocs-ukv1.onrender.com/user/database/details", { withCredentials: true,headers:{Authorization:`Bearer ${storedToken}`} })
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
  }


    return <userContext.Provider value={{user,setUser,loading,refreshUser,user_id}}>
    {children}
    </userContext.Provider>
}