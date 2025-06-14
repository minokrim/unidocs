import { useContext } from "react"
import { folderContext } from "../context/folderProvider"
import FolderCard from "../components/foldercard"
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaSearch } from "react-icons/fa";


export default function AllFolders(){
    const{folders,loading}=useContext(folderContext)
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
            <input type="search" name="" id="" placeholder="Search"  className="cursor-pointer py-1 px-3 border-solid border-gray-600 border-2 rounded-2xl w-[10em] md:w-[25em] text-black"/>
            <select name="" id="" className="border-solid border-gray-600 border-2 rounded-2xl w-[8em] md:w-[20em] text-black px-3 text-sm md:text-base">
                <option value="">Sort Last updated</option>
                <option value="">Sort by Name (A-Z)</option>
                <option value="">Sort by Name (Z-A)</option>
                <option value="">Sort by Created Date</option>
                <option value="">Sort by Number of Files</option>
            </select>
            </div>
        </section>


        <section className="flex justify-between pt-5 flex-wrap gap-3 md:gap-0">
        {folders.map((fold)=>(
            <div key={fold.id}>
                <FolderCard name={fold.folder_name} time={new Date(fold.created_at).toLocaleDateString()}/>
            </div>
        ))}
        </section>
    </main>
}