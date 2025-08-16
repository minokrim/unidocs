import React, { useState } from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
import documenticon from "../images/document.png";
import "./mergepdf.css";
import { FaPlus } from "react-icons/fa";
import Swal from "sweetalert2";
import loader from "../images/loader.svg";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Mergepdf() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);
    const[loading,setLoading]=useState(false)
    const loader=<DotLottieReact src="https://lottie.host/47714d5d-ab3c-4526-a8a1-ea14efc374f6/ohWfgGu9EF.lottie" loop autoplay className="w-auto h-[30em]"/>

    function merge() {
        if (!file1 || !file2) {
            Swal.fire({
            icon: "error",
            title: "Two Files required",
            text: "Please select both files before merging.",
          })
            return;
        }


        const formData = new FormData();
        formData.append("files", file1);
        formData.append("files", file2);
        setLoading(true);
        axios
            .post("http://localhost/pdf/file/merge", formData, { responseType: "blob" })
            .then((res) => {
                const blob = new Blob([res.data], { type: "application/pdf" });

                const fileURL = window.URL.createObjectURL(blob);
                console.log(fileURL);

                const link = document.createElement("a");
                link.href = fileURL;
                link.setAttribute("download", "output.pdf"); 

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                window.URL.revokeObjectURL(fileURL);
                setLoading(false);
            Swal.fire({
            position: "center",
            icon: "success",
            title: "Files has been merges succesfully",
            showConfirmButton: false,
            timer: 1500,
            })

                setFile1(null)
                setFile2(null)

            })
            .catch((err) => {
                setLoading(false)
          Swal.fire({
            icon: "error",
            title: "Files merge failed",
            text: "Try again",
          })
          
            });
    }

    return (
        <main className="merge-main h-full flex items-center">
            {loading?loader:<section className="">
                            <DefaultFunction functionName={"Merge PDF Files"} handleFileUpload={merge}file={file1} setFile={setFile1} functionAction={"Merge Files"}/>
            <section className="filedetails-section">
                <input type="file" id="file2-upload" style={{ display: "none" }} onChange={(e) => setFile2(e.target.files[0])}/>
                <label htmlFor="file2-upload" className="upload-btn">
                    Select File 2 <FaPlus />
                </label>
                {file2 && (
                    <div className="file-details">
                        <img src={documenticon} alt="FILE-ICON" className="file-image mt-3" />
                        <h2 className="text-black">FILE-NAME: {file2.name}</h2>
                    </div>
                )}
            </section>
                </section>}
        </main>
    );
}
