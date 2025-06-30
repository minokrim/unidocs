import { useContext, useState } from "react"
// import { folderContext } from "../context/folderProvider"
import FolderCard from "../components/foldercard"
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";
import UseFilteredData from "../components/filteringLogic";
import { AiOutlineSortDescending } from "react-icons/ai";
import { TbSortDescendingLetters } from "react-icons/tb";

export default function AllFolders(){
        const[filteringLogic,setFilteringLogic]=useState("id")
        const [orderLogic,setOrderLogic]=useState("ASC")
        const[searchTerm,setSearchTerm]=useState("")
    
        const filteredData=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"folder"})
    // const{folders,loading}=useContext(folderContext)
    return <main className="flex flex-col justify-around mt-5">
        <section>
            <div className="flex justify-between">
                <h2 className="text-black">All Folders</h2>

                <Link to="/app/createfolder" className="text-white no-underline">
                <section className="bg-blue-700 flex w-max cursor-pointer justify-center items-center text-center gap-2 rounded-lg p-2 text-base md:text-xl">
                    <FaPlus/>
                    <h5 className="font-bold text-sm md:text-2xl">New Folder</h5>
                </section>
                </Link>
            </div>


            <div className="flex justify-between pt-2">
            <input type="search" name="" id="" placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value)}}  className="cursor-pointer py-1 px-3 border-solid border-gray-600 border-2 rounded-2xl w-[10em] md:w-[25em] text-black"/>

            <section className="flex gap-5 cursor-pointer">
                        <div className="flex gap-3">
                            <AiOutlineSortDescending className="text-3xl text-black" onClick={()=>setOrderLogic("ASC")}/>
                            <TbSortDescendingLetters className="text-3xl text-black" onClick={()=>setOrderLogic("DESC")}/>
                        </div>
            <select name="" id="" value={filteringLogic} onChange={(e)=>{setFilteringLogic(e.target.value);}} className="border-solid border-gray-600 border-2 rounded-2xl w-[8em] md:w-[20em] text-black px-3 text-sm md:text-base">
                <option value="last_updated">Sort Last updated</option>
                <option value="folder_name">Sort by Name (A-Z)</option>
                <option value="created_at">Sort by Created Date</option>
                <option value="folder_size">File Size</option>
                <option value="number_of_files">Sort by Number of Files</option>
            </select>
            </section>
            </div>
        </section>


        <section className="flex pt-5 flex-wrap gap-5 md:gap-0">
        {filteredData.map((fold)=>(
            <div key={fold.id}>
                <FolderCard name={fold.folder_name} time={new Date(fold.created_at).toLocaleDateString()}/>
            </div>
        ))}
        </section>
    </main>
}