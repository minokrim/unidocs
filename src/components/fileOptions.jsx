import axios from "axios";
import { useState } from "react";
import { DeleteItem } from "./deleteLogic";
import { FaLess } from "react-icons/fa";
export default function FileOptions({id,addtoFolder,setRenderShareModal}){
    const [fileId,setFileId]=useState({id})   
    const [shareState,setShareState]=useState(false)

    function handleDelete(){
    DeleteItem({ type: "file", id: fileId })
    .then((res) => {
      alert("Deleted successfully");
    })
    .catch((err) => {
      alert("Failed to delete");
    });
    }

        function getFile(fileId){
        axios.get(`http://localhost/document/document/filedata/`, {params: { fileid: fileId },responseType: "blob"})        
        .then((res)=>{
            const fileURL = window.URL.createObjectURL(new Blob([res.data]), { type: 'application/pdf' });
                const link = document.createElement('a');
                link.href = fileURL;
                console.log(fileURL)
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