import React, { useState,useEffect } from "react";
import axios from "axios";
import { FaFolder } from "react-icons/fa";
import UseFilteredData from "../components/filteringLogic";

export default function TopFolder({onFolderCount}){
    const[filteringLogic,setFilteringLogic]=useState("id")
    const [orderLogic,setOrderLogic]=useState("ASC")
    const[searchTerm,setSearchTerm]=useState("")

    const filteredFolder=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"folder"})


    function spliceFolderName(folder_name){
        if (folder_name.length>10){
            return folder_name.slice(0,5)+"..."
        }
        else{
            return folder_name
        }
    }
    

    useEffect(()=>{
    },[filteredFolder])

    return <main className="topfile-body grid grid-cols-3 justify-around gap-10 h-[100%] overflow-scroll">
        {filteredFolder.map((data)=>(
            <div key={data.id} className="flex flex-col items-center first-line:w-full">
                <FaFolder className="text-3xl md:text-5xl"/>
                <p className="text-md md:text-md">{spliceFolderName(data.folder_name)}</p>
            </div>
        ))}
    </main>
}