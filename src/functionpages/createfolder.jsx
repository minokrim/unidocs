import React, { useState } from "react";
import axios from "axios";
export default function CreateFolder(){
    const [folderName,setFolderName]=useState("")
    const [folderDescription,setFolderDescription]=useState("")

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            folderName:folderName,
            folderDescription:folderDescription
        }
        axios.post("http://localhost:5000/folder/create",data)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

    return <main>
        <button>Create New Folder</button>
        <form action="" className="create folder">
            <input type="text" name="folder_name" id="folder_name" placeholder="Enter folder name" onChange={((e)=>setFolderName(e.target.value))}/>
            <input type="text" name="folder_description" id="folder_description" placeholder="Enter short folder Description" onChange={((e)=>setFolderDescription(e.target.value))}/>
            <button onClick={handleSubmit}>Create</button>
        </form>
    </main>
}