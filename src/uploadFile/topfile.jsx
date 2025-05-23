import React, { useState,useEffect } from "react";
import axios from "axios"
import documenticon from "../images/document.png"
import "./topfile.css"
export default function TopFile () {
    const [Data,setData]=useState([]);
    function handlegetrequest(){
        axios.get("http://localhost:5000/document/data/")
        .then((response)=>{
            console.log(response.data)
            setData(response.data.rows)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    function spliceFilename(filename){
        if (filename.length>10){
            return filename.slice(0,5)+"..."
        }
        else{
            return filename
        }
    }

    function getFile(fileid){
        axios.get(`http://localhost:5000/document/filedata/`, {params: { fileid: fileid },responseType: "blob"})        
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


    useEffect(()=>{
        handlegetrequest()
    },[])
    
    return <main className="topfile-body grid grid-cols-3 justify-around gap-10 h-[100%] overflow-scroll">
            {Data.map((docs)=>(
                <section key={docs.id} className="topfiles" onClick={() => getFile(docs.id)}>
                <img src={documenticon} alt="file icon" className="w-auto h-[3em]"/>
                <p className="text-md md:text-xl">{spliceFilename(docs.filename)}</p>
            </section>
            ))}
    </main>
}