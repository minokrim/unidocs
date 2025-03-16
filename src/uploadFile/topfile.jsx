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
    
    return <main>
        <div className="topfile-body">   
            {Data.map((docs)=>(
                <section key={docs.id} className="topfiles" onClick={() => getFile(docs.id)}>
                <img src={documenticon} alt="file icon" />
                <p>{spliceFilename(docs.filename)}</p>
            </section>
            ))}
        </div>
    </main>
}