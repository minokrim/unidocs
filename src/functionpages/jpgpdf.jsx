import React,{useState} from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
import Swal from "sweetalert2";
export default function Jpgpdf(){
        const [file,setFile]=useState(null)
    
    function jpg2pdf() {
        const formData = new FormData();
        formData.append("file", file);
        axios
          .post("http://localhost:5000/file/convert", formData, { responseType: "blob" })
          .then((res) => {
  
            const blob = new Blob([res.data], { type: "application/pdf" });
      
            const fileURL = window.URL.createObjectURL(blob);
            console.log(fileURL)
      
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute("download", "output.pdf"); // Set the filename
      
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      
            window.URL.revokeObjectURL(fileURL);
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Files converted to pdf succesfully",
            showConfirmButton: false,
            timer: 1500,
            })
            setFile(null)
          })
          .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "File conversion to audio failed",
            text: "Try again",
          })
          });
      }
      
    return <main>
        <DefaultFunction functionName={"convert File"} handleFileUpload={jpg2pdf} file={file} setFile={setFile} functionAction={"Download PDF"}/>
    </main>
}