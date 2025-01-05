import React, { useState } from "react";
import DefaultFunction from "./functionDefault";
import axios from "axios";
import documenticon from "../images/document.png";
import "./mergepdf.css";
import { FaPlus } from "react-icons/fa";

export default function Mergepdf() {
    const [file1, setFile1] = useState(null);
    const [file2, setFile2] = useState(null);

    function merge() {
        if (!file1 || !file2) {
            alert("Please select both files before merging.");
            return;
        }

        const formData = new FormData();
        formData.append("files", file1);
        formData.append("files", file2);

        axios
            .post("http://localhost:5000/file/merge", formData, { responseType: "blob" })
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
            })
            .catch((err) => {
                console.error("Error downloading file:", err);
            });
    }

    return (
        <main className="merge-main">
            <DefaultFunction functionName={"Merge PDF Files"} handleFileUpload={merge}file={file1} setFile={setFile1} functionAction={"Merge Files"}/>
            <section className="filedetails-section">
                <input type="file" id="file2-upload" style={{ display: "none" }} onChange={(e) => setFile2(e.target.files[0])}/>
                <label htmlFor="file2-upload" className="upload-btn">
                    Select File 2 <FaPlus />
                </label>
                {file2 && (
                    <div className="file-details">
                        <img src={documenticon} alt="FILE-ICON" className="file-image" />
                        <h2>FILE-NAME: {file2.name}</h2>
                    </div>
                )}
            </section>
        </main>
    );
}
