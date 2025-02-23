import React,{useState,} from "react";
import axios from "axios";
import "./uploadfile.css"
import DefaultFunction from "./functionDefault";
export default function UploadFiles(){
    const [file,setFile]=useState(null)
    const [metaData,setMetaData]=useState("")
    // const [editFilePath,setEditFilePath]=useState()
    // const [fileData,setFileData]=useState()
    function handleFileUpload(e){
      if (!file) {
        alert("Please select a file before uploading.");
        return;
    }
        const formData=new FormData();
        formData.append("file",file);
        formData.append("metadata",file.name);
        console.log(formData)
            axios.post("http://localhost:5000/upload/file/metadata",formData)
            .then((response)=>{
              console.log("file upload sucess")
            })
            .catch((err)=>{
              console.log(err)
            })
        
          }

    return <main>
      <DefaultFunction functionName={"upload File"} handleFileUpload={handleFileUpload} filestate={file} setFile={setFile} file={file} functionAction={"Upload File"}/>
    </main>
}