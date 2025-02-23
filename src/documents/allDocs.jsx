import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TopNav from "../nav/topnav";
import axios from "axios";
import UploadFiles from "../functionpages/uploadfile";
export default function AllDocuments(){
    const [data,setData]=useState([])

    function handlegetrequest(){
        axios.get("http://localhost:5000/document/data/")
        .then((response)=>{
            console.log(response.data)
            setData(response.data.rows)
            console.log("data:"+data)
        })
        .catch((err)=>{
            console.log(err)
        })
    }

        useEffect(()=>{
            handlegetrequest()
        },[])

    return <main className="flex flex-col">
        <UploadFiles/>
        <section className="flex flex-row items-center gap-2 mt-10 mr-10 justify-end">
        <FaSearch className="text-2xl text-black"/>
        <input type="name" name="search" className="border-solid bg-gray-200 w-[20em] h-[2em] rounded-2xl pl-5"/>
        </section>

        <section className="mt-5">
            <table className="flex flex-col justify-around gap-0 items-center text-black">
                <tr className="flex bg-gray-200/20 w-full py-5 mb-0 justify-around">
                    <th>Title</th>
                    <th>Description</th>
                    <th>Folder</th>
                    <th>Size</th>
                    <th>Type</th>
                    <th>Link</th>
                </tr>
                <div className="bg-gray-200/20 text-black w-full flex flex-col gap-10">
                {data.map((docs)=>(
                    <tr key={docs.id} className="flex w-full justify-around" >
                        <td className="text-left text-purple-800 text-xl font-medium w-[100px] whitespace-nowrap overflow-hidden text-ellipsis">{docs.filename}</td>
                        <td className="text-left w-[90px] whitespace-nowrap overflow-hidden text-ellipsis">{docs.metadata}</td>
                        <td className="text-left w-[10px] whitespace-nowrap overflow-hidden text-ellipsis"></td>
                        <td>2mb</td>
                        <td>pdf</td>
                        <td className="cursor-pointer bg-purple-800 p-2 text-white text-lg"><a href={docs.link} target="_blank" rel="noopener noreferrer">View</a></td>
                    </tr>
                ))}
                </div>
            </table>
        </section>
    </main>
}