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

    return <main className="flex flex-col border-5 border-solid border-red-500 h-[30em]">
        <form action="" className="flex flex-col items-center justify-center gap-10 bg-purple-700/70 w-1/3 h-full rounded-2xl">
            <input type="text" name="folder_name" id="folder_name" placeholder="Enter folder name" className="bg-gray-100 w-[80%] active:border-none" onChange={((e)=>setFolderName(e.target.value))}/>
            <input type="text" name="folder_description" id="folder_description" placeholder="Enter short folder Description" className="bg-gray-100 w-[80%] h-[5em]" onChange={((e)=>setFolderDescription(e.target.value))}/>
            <button onClick={handleSubmit} className="w-1/2">Create New folder</button>
        </form>
    </main>
}