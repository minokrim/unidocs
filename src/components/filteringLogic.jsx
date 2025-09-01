import axios from "axios"
import { useEffect, useState,useContext } from "react"
import { userContext } from "../context/userProvider";

export default function useFilteredData({filteringLogic, orderLogic, searchTerm, type,reloadTrigger}){
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const {user,loading:userLoading,user_id}=useContext(userContext)

    useEffect(()=>{
        if(!userLoading && user?.id){
        axios.post(`https://unidocs-ukv1.onrender.com/${type}/${type}/data`,{logic:filteringLogic,order:orderLogic,id:user.id},{ withCredentials: true })
        .then((response)=>{
            setData(response.data.rows)
        })
        .catch((err)=>{
            console.log(err)
        })
        }
    }, [filteringLogic, orderLogic, type,user.id, userLoading,reloadTrigger])

        useEffect(()=>{
            const search = searchTerm.toLowerCase();
            let result=[]
            if(type==='document'){
             result=data.filter(d => d.filename.toLowerCase().includes(search));
            }
            else if(type==='folder'){
            result=data.filter(d => d.folder_name.toLowerCase().includes(search));
            }
            setFilteredData(result)

        },[searchTerm,data,type])
        
        return(filteredData)
}