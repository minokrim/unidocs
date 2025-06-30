import { useState } from "react"
import UseFilteredData from "./filteringLogic"
import { FaFolder } from "react-icons/fa"
import { FaPlus } from "react-icons/fa"
import axios from "axios"
export default function AddtoFolder({fileId,onclose}){
        const[filteringLogic,setFilteringLogic]=useState("id")
        const [orderLogic,setOrderLogic]=useState("ASC")
        const[searchTerm,setSearchTerm]=useState("")
        const [selectedFolder,setSelectedFolder]=useState([])
    
        const filteredData=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"folder"})

        function handleCheckBoxToggle(folder_id){
            if(selectedFolder.includes(folder_id)){
                setSelectedFolder(selectedFolder.filter(id=>id!==folder_id))
            }
            else{
                setSelectedFolder(prev=>[...prev,folder_id])
            }
        }

        function handleFiletoFolder(){
            axios.post("http://localhost:5000/document/addtofolder",{file_id:fileId,folder_id:selectedFolder})
            .then((res)=>{
                console.log(res)
                onclose()
                return res
            })
            .catch((err)=>{
                return err
            })
        }

    return <main className="text-black flex flex-col bg-white shadow-2xl rounded-xl w-[40%] p-5">
        <h3 className="text-xl">Add to Folder</h3>
        <input type="search" onChange={(e)=>{setSearchTerm(e.target.value)}} className="bg-gray-100 rounded-md w-[80%] pl-3 py-1" placeholder="search Folders"/>

        <section className="flex flex-col gap-2 overflow-y-scroll py-3" style={{scrollbarWidth:'none',msOverflowStyle: 'none'}}>
            {filteredData.map((folders)=>(
                <section key={folders.id} >
                    <div className="flex gap-5 items-center">
                    <input type="checkbox" className="border-1 w-6 h-6 accent-purple-600" onChange={()=>handleCheckBoxToggle(folders.id)} checked={selectedFolder.includes(folders.id)}/>
                    <FaFolder className="text-purple-600 text-4xl "/>
                    <h5 className="text-xl font-semibold">{folders.folder_name}</h5>
                </div>
                <hr />
                </section>
            ))}
        </section>

        <section className="flex items-center justify-between">
            <div className="flex items-center font-bold gap-2">
                <FaPlus className="text-purple-600 text-4xl"/>
                <h5 className="text-purple-600 text-xl font-bold">New Folder</h5>
            </div>

            <div className="flex items-center gap-2 font-bold cursor-pointer">
                <p className="border-1 rounded-md p-2" onClick={onclose}>Cancel</p>
                <p className="bg-purple-600 first-line:rounded-md text-white p-2 rounded-md" onClick={handleFiletoFolder}>Done</p>
            </div>
        </section>
    </main>
}