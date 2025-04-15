import React, { useState,useEffect } from "react";
import axios from "axios";
import { FaFolder } from "react-icons/fa";

export default function TopFolder(){
    const [data,setData]=useState([]);

    const handleFolderRetrieval=()=>{
        axios.get("http://localhost:5000/folder/data/")
        .then((response)=>{
            setData(response.data.rows)
        })
        .catch((error)=>{
            console.log(error)
        })
    }

    function spliceFolderName(folder_name){
        if (folder_name.length>10){
            return folder_name.slice(0,5)+"..."
        }
        else{
            return folder_name
        }
    }
    

    useEffect(()=>{
        handleFolderRetrieval()
    },[])

    return <main className="grid grid-cols-2 justify-around gap-10">
        {data.map((data)=>(
            <div key={data.id} className=" flex flex-col items-center first-line:w-full">
                <FaFolder className="text-6xl"/>
                <p className="text-2xl">{spliceFolderName(data.folder_name)}</p>
            </div>
        ))}
    </main>
}