import axios from "axios";
import { useState } from "react";
import { deleteItem } from "./deleteLogic";
import { Link } from "react-router-dom";
export default function FolderOptions({id,userid}){
    console.log("FolderOptions props:", { id, userid });

    function handleDelete(){
    console.log(id)
    deleteItem({ type: "folder", id })
    .then((res) => {
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log("Failed to delete");
    });
    }


    return <main className="flex flex-col w-max items-center justify-center text-black rounded-2xl shadow-black shadow-2xl px-1 cursor-pointer text-sm font-bold">
        <Link to={`/app/folderfile?folderId=${id}&userId=${userid}`}>
                <p >Open Folder</p>
        </Link>
        <p className="text-red-700" onClick={handleDelete}>Delete Folder</p>
    </main>
}