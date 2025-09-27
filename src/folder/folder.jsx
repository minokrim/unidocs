import { useContext, useState,useRef } from "react"
import FolderCard from "../components/foldercard"
import { FaPlus } from "react-icons/fa6";
import { Link } from "react-router-dom";
import UseFilteredData from "../components/filteringLogic";
import { AiOutlineSortDescending } from "react-icons/ai";
import { TbSortDescendingLetters } from "react-icons/tb";
import FolderOptions from "../components/folderOptions";
export default function AllFolders(){
        const[filteringLogic,setFilteringLogic]=useState("id")
        const [orderLogic,setOrderLogic]=useState("ASC")
        const[searchTerm,setSearchTerm]=useState("")
        const [menuOpen, setMenuOpen] = useState(false);
        const [folderId,setFolderId]=useState(null)
        const[hoverPosition,setHoverPosition]=useState({x:0,y:0,bottom:0,top:0,right:0,left:0})

let hoverTimeout = useRef(null);

function handleMenuToggle(e, status,folderIdArg) {
    if (folderIdArg !== undefined) setFolderId(folderIdArg);
    if (status) {
        clearTimeout(hoverTimeout.current); 
        setMenuOpen(true);

        if (e) { 
            const position = e.target.getBoundingClientRect();
            setHoverPosition({
                x: position.x + window.scrollX,
                y: position.y + window.scrollY,
                bottom: position.bottom,
                top: position.top + window.scrollY,
                right: position.right,
                left: position.left + window.scrollX,
            });
        }
    } else {
        hoverTimeout.current = setTimeout(() => {
            setMenuOpen(false);
        }, 150);
    }
}

    
        const filteredData=UseFilteredData({filteringLogic, orderLogic, searchTerm, type:"folder"})
        const selectedFolder = filteredData.find(f => f.id === folderId);

    return <main className="flex flex-col justify-around mt-5 p-2">
        <section className="w-[100%] px-3 md:px-3">
            <div className="flex justify-between">
                <h2 className="text-black">All Folders</h2>

                <Link to="/app/createfolder" className="text-white no-underline">
                <section className="bg-blue-700 flex w-max cursor-pointer justify-center items-center text-center gap-2 rounded-lg p-2 text-base md:text-xl">
                    <FaPlus/>
                    <h5 className="font-bold text-sm md:text-2xl">New Folder</h5>
                </section>
                </Link>
            </div>


            <div className="flex flex-col md:flex-row justify-between pt-2">
            <input type="search" name="" id="" placeholder="Search" onChange={(e)=>{setSearchTerm(e.target.value)}}  className="cursor-pointer py-1 px-3 border-solid border-purple-600 border-2 rounded-2xl w-[905]  md:w-[25em] text-black"/>

            <section className="flex justify-between mt-3 gap-5 cursor-pointer">
                        <div className="flex gap-3">
                            <AiOutlineSortDescending className="text-3xl text-black border-[0.05em] border-purple-900" onClick={()=>setOrderLogic("ASC")}/>
                            <TbSortDescendingLetters className="text-3xl text-black border-[0.05em] border-purple-900" onClick={()=>setOrderLogic("DESC")}/>
                        </div>
            <select name="" id="" value={filteringLogic} onChange={(e)=>{setFilteringLogic(e.target.value);}} className="border-solid border-purple-600 border-2 rounded-2xl w-[8em] md:w-[20em] text-black px-3 text-sm md:text-base">
                <option value="last_updated">Sort Last updated</option>
                <option value="folder_name">Sort by Name (A-Z)</option>
                <option value="created_at">Sort by Created Date</option>
                <option value="folder_size">File Size</option>
                <option value="number_of_files">Sort by Number of Files</option>
            </select>
            </section>
            </div>
        </section>


        <section className="w-[100%] flex pt-5 pl-5 flex-wrap gap-3 md:gap-1 items-center justify-around" >
        {filteredData.map((fold)=>(
            <div key={fold.id}>
                <FolderCard name={fold.folder_name} onToggleMenu={(e) => handleMenuToggle(e, true,fold.id)} onMouseLeave={() => handleMenuToggle(null, false)} time={new Date(fold.created_at).toLocaleDateString()}/>
            </div>
        ))}

        {menuOpen && (<div className="absolute z-30" style={{
        top:hoverPosition.top+30,
        left:hoverPosition.left-50,
        bottom:hoverPosition.bottom,
        right:hoverPosition.right,
        x:hoverPosition.x,
        y:hoverPosition.y
        }} 
        onMouseEnter={() => handleMenuToggle(null, true)} 
        onMouseLeave={() => handleMenuToggle(null, false)}>
        {menuOpen && (<div><FolderOptions  id={folderId} userid={filteredData[0].user_id}/></div>)}
        </div>)}
        </section>
    </main>
    
}