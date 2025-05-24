import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TopNav from "../nav/topnav";
import axios from "axios";
import UploadFiles from "../functionpages/uploadfile";
import { MdDelete } from "react-icons/md";

export default function AllDocuments(){
    const [data,setData]=useState([])

    function handlegetrequest(){
        axios.get("http://localhost:5000/document/data/")
        .then((response)=>{
            setData(response.data.rows)
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
        <section className="w-full flex flex-row items-center justify-center gap-4 md:gap-2 mt-10 mr-10 md:justify-end">
        <FaSearch className="text-2xl text-black"/>
        <input type="name" name="search" className="w-[15em] border-solid bg-gray-200 md:w-[20em] h-[2em] rounded-2xl pl-5"/>
        </section>

        <section className="mt-5">
            <table className="flex flex-col justify-around gap-0 items-center text-black">
                <tr className="flex bg-gray-200/20 w-full py-5 mb-0 justify-around">
                    <th className="w-[5em] text-end">Title</th>
                    <th className="w-[5em] text-end">Descr</th>
                    <th className="w-[5em] text-end">Folder</th>
                    <th className="w-[5em] text-end ">Size</th>
                    <th className="w-[5em] text-end">Type</th>
                    <th className="w-[5em] text-end">Link</th>
                    <th className="w-[5em] text-end">Delete</th>
                </tr>
                <div className="bg-gray-200/20 text-black w-full flex flex-col gap-10">
                {data.map((docs)=>(
                    <tr key={docs.id} className="flex w-full justify-around" >
                        <td className="text-left text-purple-800 text-base md:text-xl font-medium w-[5em] whitespace-nowrap overflow-hidden text-ellipsis">{docs.filename}</td>
                        <td className="text-left w-[5em] whitespace-nowrap overflow-hidden text-ellipsis border-solid">{docs.metadata}</td>
                        <td className="text-left w-[5em] whitespace-nowrap overflow-hidden text-ellipsis">Folder</td>
                        <td className="w-[5em]">2mb</td>
                        <td className="w-[5em]">pdf</td>
                        <td className="cursor-pointer bg-purple-800 p-0.5 md:p-2 text-white text-lg"><a href={docs.link} target="_blank" rel="noopener noreferrer">View</a></td>
                        <td className="text-2xl"><MdDelete /></td>
                    </tr>
                ))}
                </div>
            </table>
        </section>
    </main>
}