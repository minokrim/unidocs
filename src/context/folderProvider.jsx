import { Children, createContext, useEffect, useState,useContext} from "react";
import axios from "axios";
import { userContext } from "./userProvider";

export const folderContext=createContext()

export default function FolderProvider({children}){
    const[folders,setFolders]=useState([])
    const[loading,setloading]=useState(true)
//     const {user,loading:userLoading}=useContext(userContext)
//     console.log(user.id)
        


// useEffect(() => {
//     if (!userLoading && user?.id) {
//         console.log('Fetching folders for user:', user.id);
//         getFolders(user.id);
//     }
// }, [userLoading, user?.id]);

    const getFolders=(userid)=>{
      axios.post("http://localhost/folder/folder/data",{id:userid}, { withCredentials: true } )
        .then((response) => {
          setFolders(response.data.rows);
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
