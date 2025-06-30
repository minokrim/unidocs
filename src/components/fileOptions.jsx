import axios from "axios";
import { useState } from "react";
import { deleteItem } from "./deleteLogic";
export default function FileOptions({id,addtoFolder}){
    const [fileId,setFileId]=useState({id})   

    function handleDelete(){
    deleteItem({ type: "file", id: fileId })
    .then((res) => {
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log("Failed to delete");
    });
    }


    return <main className="flex flex-col w-max items-center justify-center text-black rounded-2xl shadow-black shadow-2xl px-1 cursor-pointer text-sm font-bold">
        <p>Share File</p>
        <p onClick={()=>addtoFolder(id)}>Add to Folder</p>
        <p className="text-red-700" onClick={handleDelete}>Delete File</p>
    </main>
}