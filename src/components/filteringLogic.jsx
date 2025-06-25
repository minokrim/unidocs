import axios from "axios"
import { useEffect, useState,useContext } from "react"
import { userContext } from "../context/userProvider";

export default function UseFilteredData({filteringLogic, orderLogic, searchTerm, type}){
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
        const[id,setId]=useState("")
    const {user}=useContext(userContext);

    useEffect(()=>{
        setId(user.id)
        axios.post(`http://localhost:5000/${type}/data`,{logic:filteringLogic,order:orderLogic,id:id},{ withCredentials: true })
        .then((response)=>{
            console.log(response.data.rows)
            setData(response.data.rows)
        })
        .catch((err)=>{
            console.log(err)
        })
    }, [filteringLogic, orderLogic, type])

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