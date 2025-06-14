import { Children, createContext, useEffect, useState } from "react";
import axios from "axios";
export const folderContext=createContext()

export default function FolderProvider({children}){
    const[folders,setFolders]=useState([])
    const[loading,setloading]=useState(true)

    useEffect(()=>{
        getFolders()
    },[])

    const getFolders=()=>{
      axios.get("http://localhost:5000/folder/data", { withCredentials: true })
        .then((response) => {
          setFolders(response.data.rows);
          console.log(response.data.rows)
        })
        .catch((err) => {
          console.log("Error fetching folders:", err);
        })
        .finally(() => {
          setloading(false);
        });
    }
    return <folderContext.Provider value={{folders,setFolders,loading,getFolders}}>
    {children}
    </folderContext.Provider>
}
