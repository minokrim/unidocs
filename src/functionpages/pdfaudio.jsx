import React,{useState} from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
import Swal from "sweetalert2";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Pdfaudio(){
    const [file,setFile]=useState(null)
      const[loading,setLoading]=useState(false)
  const loader=<DotLottieReact src="https://lottie.host/47714d5d-ab3c-4526-a8a1-ea14efc374f6/ohWfgGu9EF.lottie" loop autoplay className="w-auto h-[30em]"/>
    function convertfiletoaudio() {
        const formData = new FormData();
        formData.append("file", file);
        setLoading(true)
        axios.post("https://unidocs-ukv1.onrender.com/pdf/file/audio", formData, { responseType: "blob" })
          .then((res) => {
  
            const blob = new Blob([res.data], { type: "audio/mp3" });
      
            const fileURL = window.URL.createObjectURL(blob);      
            const link = document.createElement("a");
            link.href = fileURL;
            link.setAttribute("download", "output.mp3");
      
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
      
            window.URL.revokeObjectURL(fileURL);
            Swal.fire({
            position: "center",
            icon: "success",
            title: "File has been converted to audio",
            showConfirmButton: false,
            timer: 1500,
            })
            setFile(null);
            setLoading(false);
          })
          .catch((err) => {
            console.error("Error downloading file:", err);
          Swal.fire({
            icon: "error",
            title: "File conversion to audio failed",
            text: "Try again",
          })
          setLoading(false);
          });
      }
    return <main className="items-center justify-center">
      {loading?loader:<DefaultFunction functionName={"convert File to Audio"} handleFileUpload={convertfiletoaudio} file={file} setFile={setFile} functionAction={"Convert PDF to audio"}/>
}
    </main>
}