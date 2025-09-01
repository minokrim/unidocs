import React, { useState,useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { userContext } from "../context/userProvider";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function CreateFolder(){
    const [folderName,setFolderName]=useState("")
    const [folderDescription,setFolderDescription]=useState("")
    const{user}=useContext(userContext)
    const[loading,setLoading]=useState(false)
    const loader=<DotLottieReact src="https://lottie.host/47714d5d-ab3c-4526-a8a1-ea14efc374f6/ohWfgGu9EF.lottie" loop autoplay className="w-auto h-[30em]"/>
    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            folderName:folderName,
            folderDescription:folderDescription,
            userId:user.id
        }
        setLoading(true)
        axios.post("https://unidocs-ukv1.onrender.com/folder/folder/create",data)
        .then((res)=>{
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Folder created succesfully",
            showConfirmButton: false,
            timer: 1500,
            })
            setLoading(false)
        })
        .catch((err)=>{
          Swal.fire({
            icon: "error",
            title: "File creation failed",
            text: "Try again",
          })
          setLoading(false)
        })
    }

    return <main className="flex flex-col h-full w-full bg-purple-200 text-black p-5">
        {loading?loader:<form action="" className="flex flex-col items-left justify-center gap-10 bg-white w-full h-[50%] rounded-2xl px-5">
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
        </form>}
    </main>
}