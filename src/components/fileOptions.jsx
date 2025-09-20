import axios from "axios";
import { useContext, useState } from "react";
import  DeleteItem  from "./deleteLogic";
import { userContext } from "../context/userProvider";
export default function FileOptions({id,addtoFolder,setRenderShareModal,onDelete}){
    const user=useContext(userContext)

    function handleDelete(){
    DeleteItem({ type: "document", id, user})
    .then((res) => {
      if(onDelete){
        onDelete()
      }
    })
    .catch((err) => {
      console.log(err)
    });
    }

        function getFile(fileId){
        axios.get(`https://unidocs-ukv1.onrender.com/document/document/filedata/`, {params: { fileid: fileId },responseType: "blob"})        
        .then((res)=>{
            const fileURL = window.URL.createObjectURL(new Blob([res.data], { type: res.data.type }));
                const link = document.createElement('a');
                link.href = fileURL;
                link.setAttribute('download', "document.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
        })
        .catch((err)=>{
        })
    }

    function handleShare(){
            setRenderShareModal(true)
    }


    return <main className="flex flex-col w-max items-center justify-center text-black rounded-2xl shadow-black shadow-2xl px-1 cursor-pointer text-sm font-bold">
        <p onClick={handleShare}>Share File</p>
        <p onClick={()=>addtoFolder(id)}>Add to Folder</p>
        <p onClick={()=>getFile(id)}>Download File</p>
        <p className="text-red-700" onClick={handleDelete}>Delete File</p>
    </main>
}