import ficon from "../images/foldericon.png"
import dots from "../images/dots2.png";
export default function FolderCard({name,filenum,time}){
    return <main className="bg-gradient-to-t from-violet-800/50 w-[8em] md:w-[12em] to-black flex flex-col rounded-xl cursor-pointer">
        <img src={ficon} alt="" className="w-[4em] h-[5em] md:w-[8em] md:h-[10em]"/>
        <div className="flex flex-col text-left w-[100%] pl-5">
        <h4 className="text-base md:text-lg border-solid w-full">{name}</h4>
        <p className="text-base md:text-lg font-medium pb-0" >{time}</p>
        <p className="text-base md:text-lg font-medium mt-0 mb-0 pb-0" >{filenum}13 files</p>
        <img src={dots} alt="" className="w-[1.5em] h-auto self-end mt-0 pt-0 mb-1"/>
        </div>
    </main>

}