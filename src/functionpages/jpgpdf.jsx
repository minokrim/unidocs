import React,{useState} from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
import Swal from "sweetalert2";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Jpgpdf(){
    const [file,setFile]=useState(null)
    const[loading,setLoading]=useState(false)
    const loader=<DotLottieReact src="https://lottie.host/47714d5d-ab3c-4526-a8a1-ea14efc374f6/ohWfgGu9EF.lottie" loop autoplay className="w-auto h-[30em]"/>
    function jpg2pdf() {
        const formData = new FormData();
        setLoading(true)
        formData.append("file", file);
        axios
          .post("https://unidocs-ukv1.onrender.com/pdf/file/convert", formData, { responseType: "blob" })
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
            setLoading(false)
          })
          .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "File conversion to jpg failed",
            text: "Try again",
          })
          setLoading(false)
          });
      }
      
    return <main className="flex items-center justify-center">
      {loading?loader:<DefaultFunction functionName={"convert File"} handleFileUpload={jpg2pdf} file={file} setFile={setFile} functionAction={"Download PDF"}/>
}
    </main>
}