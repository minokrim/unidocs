import React,{useState} from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
export default function Pdfaudio(){
    const [file,setFile]=useState(null)
    
    function convertfiletoaudio() {
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
            link.setAttribute("download", "output.mp3");
      
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      
            window.URL.revokeObjectURL(fileURL);
          })
          .catch((err) => {
            console.error("Error downloading file:", err);
          });
      }
    return <main>
        <DefaultFunction functionName={"convert File to Audio"} handleFileUpload={convertfiletoaudio} file={file} setFile={setFile} functionAction={"Convert PDF to audio"}/>
    </main>
}