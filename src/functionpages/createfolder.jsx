import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
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
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Folder created succesfully",
            showConfirmButton: false,
            timer: 1500,
            })
        })
        .catch((err)=>{
          Swal.fire({
            icon: "error",
            title: "File creation failed",
            text: "Try again",
          })
        })
    }

    return <main className="flex flex-col h-full w-full bg-purple-200 text-black p-5">
        <form action="" className="flex flex-col items-left justify-center gap-10 bg-white w-full h-[50%] rounded-2xl px-5">
            <h4>Create New Folder</h4>

            <section className="mt-0 pt-0">
                <p className="mb-0 pb-0">Folder Name</p>
            <input type="text" name="folder_name" id="folder_name" className="border border-black border-solid w-[80%] active:border-none mt-0 pt-0 py-3 px-2 rounded-lg" onChange={((e)=>setFolderName(e.target.value))}/>
            </section>
            
            <section>
            <p className="mb-0 pb-0">Folder description</p>
            <input type="text" name="folder_description" id="folder_description" placeholder="Enter short folder Description" className="border border-black border-solid w-[80%] active:border-none mt-0 pt-0 py-28 px-2 rounded-lg" onChange={((e)=>setFolderDescription(e.target.value))}/>
            </section>

            <button onClick={handleSubmit} className="w-1/4 bg-gradient-to-r from-blue-500 to-purple-500 flex text-center items-center justify-center">Create New Folder</button>
        </form>
    </main>
}