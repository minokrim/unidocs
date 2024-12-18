import React,{useState,} from "react";
import axios from "axios";
import NavDash from "../dashboard/navdash";
import documenticon from "../images/document.png"
import { FaPlus } from "react-icons/fa";
import "./uploadfile.css"
export default function UploadFiles(){
    const [file,setFile]=useState(null)
    const [metaData,setMetaData]=useState("")
    // const [editFilePath,setEditFilePath]=useState()
    // const [fileData,setFileData]=useState()

    function editfile() {
      const formData = new FormData();
      formData.append("file", file);
      axios
        .post("http://localhost:5000/file/audio", formData, { responseType: "blob" })
        .then((res) => {

          const blob = new Blob([res.data], { type: "audio/mp3" });
    
          const fileURL = window.URL.createObjectURL(blob);
          console.log(fileURL)
    
          const link = document.createElement("a");
          link.href = fileURL;
          link.setAttribute("download", "output.mp3"); // Set the filename
    
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
    
          window.URL.revokeObjectURL(fileURL);
        })
        .catch((err) => {
          console.error("Error downloading file:", err);
        });
    }
    

    function handleFileUpload(e){
        const formData=new FormData();
        formData.append("file",file);
        formData.append("metadata",setMetaData(file.name));
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
        <NavDash />
        <div className="uplaodfile-body">   
            <h1>Upload Files To Uni-Docs Server.</h1>
            <p>Easily upload your documents to the Uni-Docs server for secure storage, quick access, and seamless sharing. <br />Stay organized and manage your files efficiently with just a few clicks!</p>
            <input type="file" id="file-upload" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/>
            <label htmlFor="file-upload">Select File <FaPlus/> </label>

            <section className="filedetails-section">
                {file && <div className="file-details">
                    <img src={documenticon} alt="FILE-ICON" className="file-image"/>
                    <h2>FILE-NAME:{file.name}</h2>
                    <button onClick={handleFileUpload}>Upload File</button>
                    </div>}
                    <button onClick={editfile}>clcik me</button>
            </section>
        </div>
    </main>
}