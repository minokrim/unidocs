import React, { useState,useEffect } from "react";
import axios from "axios"
import documenticon from "../images/document.png"
import "./topfile.css"
import UseFilteredData from "../components/filteringLogic";
import { CiFileOn } from "react-icons/ci";

export default function TopFile ({onFileCountUpdate}) {
    const [Data,setData]=useState([]);
        const[filteringLogic,setFilteringLogic]=useState("id")
        const [orderLogic,setOrderLogic]=useState("ASC")
        const[searchTerm,setSearchTerm]=useState("")

    const filteredData=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"document"})
    const splicedData=filteredData.slice(0,9)

    function spliceFilename(filename){
        if (filename.length>10){
            return filename.slice(0,5)+"..."
        }
        else{
            return filename
        }
    }


    function getFile(fileid){
        axios.get(`https://unidocs-ukv1.onrender.com/user/document/filedata/`, {params: { fileid: fileid },responseType: "blob"})        
        .then((res)=>{
            console.log("Id sent succesfully")

            const fileURL = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = fileURL;
                console.log(fileURL)
                link.setAttribute('download', "document.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        })
        .catch((err)=>{
            console.log(err)
        })
    }

  useEffect(() => {
    if (onFileCountUpdate) {
      onFileCountUpdate(filteredData.length);
    }
  }, [filteredData, onFileCountUpdate]);

    return <main className="topfile-body grid grid-cols-3 justify-around gap-10 h-[100%] overflow-scroll">
            {splicedData.map((docs)=>(
                <section key={docs.id} className="topfiles" onClick={() => getFile(docs.id)}>
                <CiFileOn className="w-auto h-[3em]"/>
                <p className="text-md md:text-xl">{spliceFilename(docs.filename)}</p>
            </section>
            ))}
    </main>
}