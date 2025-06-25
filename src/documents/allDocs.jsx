import React, { useState,useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import TopNav from "../nav/topnav";
import axios from "axios";
import UploadFiles from "../functionpages/uploadfile";
import { MdDelete } from "react-icons/md";
import { AiOutlineSortDescending } from "react-icons/ai";
import { TbSortDescendingLetters } from "react-icons/tb";
import UseFilteredData from "../components/filteringLogic";
import dots from "../images/dots2.png";
import FileOptions from "../components/fileOptions";


export default function AllDocuments(){
    const [data,setData]=useState([])
    const[filteringLogic,setFilteringLogic]=useState("id")
    const [orderLogic,setOrderLogic]=useState("ASC")
    const[searchTerm,setSearchTerm]=useState("")
    const[hoverState,setHoverState]=useState(false)
    const[hoverPosition,setHoverPosition]=useState({x:0,y:0,bottom:0,top:0,right:0,left:0})

    function handleMouseOver(e){
        const position=e.target.getBoundingClientRect()
        console.log(position)
        setHoverPosition({
            x:position.x+ window.scrollX,
            y:position.y+ window.scrollY,
            bottom:position.bottom,
            top:position.top+ window.scrollY,
            right:position.right,
            left:position.left+ window.scrollX
        })
        setHoverState(true)
    }
    function handleMouseOut(){
        setHoverState(false)
    }


    function handleMouseOver2(){
        setHoverState(true)
    }


    const filteredData=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"document"})

    return <main className="flex flex-col">
        <UploadFiles/>
        <section className="w-full flex flex-row items-center justify-center gap-4 md:gap-2 mt-10 mr-10 md:justify-between">
        <div className="flex items-center gap-3 text-black font-bold">
        <FaSearch className="text-2xl text-black"/>
        <input type="name" name="search" onChange={(e)=>{setSearchTerm(e.target.value)}} className="w-[15em] border-solid bg-gray-200 md:w-[20em] h-[2em] rounded-2xl pl-5"/>
        </div>


        <section className="flex gap-5 cursor-pointer">
        <div className="flex gap-3">
            <AiOutlineSortDescending className="text-3xl text-black" onClick={()=>setOrderLogic("ASC")}/>
            <TbSortDescendingLetters className="text-3xl text-black" onClick={()=>setOrderLogic("DESC")}/>
        </div>


        <select name="" id="" value={filteringLogic} onChange={(e)=>{setFilteringLogic(e.target.value);}} className="border-solid border-gray-600 border-2 rounded-2xl w-[8em] md:w-[20em] text-black px-3 text-sm md:text-base">
                <option value="filename">Sort by Name (A-Z)</option>
                <option value="created_at">Sort by Created Date</option>
                <option value="file_size">File Size</option>
                <option value="File_type">File Type</option>
        </select>
        </section>
        </section>

        <section className="mt-5">
            <table className="flex flex-col justify-around gap-0 items-center text-black relative">
                <thead className="flex justify-around w-full">
                    <tr className="flex bg-gray-200/20 w-full py-5 mb-0 justify-around">
                    <th className="w-[5em] text-end">Title</th>
                    <th className="w-[5em] text-end">Descr</th>
                    <th className="w-[5em] text-end">Folder</th>
                    <th className="w-[5em] text-end ">Size</th>
                    <th className="w-[5em] text-end">Type</th>
                    <th className="w-[5em] text-end">Link</th>
                    <th className="w-[5em] text-end">Delete</th>
                </tr>
                </thead>
                <tbody className="bg-gray-200/20 text-black w-full flex flex-col gap-10">
                {
                filteredData.map((docs)=>(
                    <tr key={docs.id} className="flex w-full justify-around p-2" >
                        <td className="text-left text-purple-800 text-base md:text-xl font-medium w-[5em] whitespace-nowrap overflow-hidden text-ellipsis">{docs.filename}</td>
                        <td className="text-left w-[5em] whitespace-nowrap overflow-hidden text-ellipsis border-solid">{docs.metadata}</td>
                        <td className="text-left w-[5em] whitespace-nowrap overflow-hidden text-ellipsis">Folder</td>
                        <td className="w-[5em]">{docs.file_size}Mb</td>
                        <td className="w-[5em]">pdf</td>
                        <td className="cursor-pointer bg-purple-800 p-0.5 md:p-2 text-white text-lg rounded-md"><a href={docs.link} target="_blank" rel="noopener noreferrer">View</a></td>
                        <td className="text-2xl" onMouseOut={handleMouseOut} onMouseOver={(e)=>{handleMouseOver(e)}}><img src={dots} alt="" className="h-5 w-auto box-border cursor-pointer" /></td>
                    </tr>
                ))}
                </tbody>
            </table>
            {hoverState && <div onMouseOut={handleMouseOut} onMouseOver={handleMouseOver2} className="w-max absolute z-60" style={{
                top:hoverPosition.top+20,
                left:hoverPosition.left,
                bottom:hoverPosition.bottom,
                right:hoverPosition.right,
                x:hoverPosition.x,
                y:hoverPosition.y
            }}>
                <FileOptions/>
                </div>}

        </section>
    </main>
}