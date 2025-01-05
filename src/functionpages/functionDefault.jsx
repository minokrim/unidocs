import React, { useState } from "react";
import "./functionDefault.css"
import Dash from "../dashboard/dash";
import documenticon from "../images/document.png"
import { FaPlus } from "react-icons/fa";
export default function DefaultFunction({handleFileUpload,functionName,setFile,file,functionAction}){
    return <main>
            <div className="uplaodfile-body">  
                <h1>{functionName}</h1>
              <Dash/> 
                <input type="file" id="file-upload" style={{ display: "none" }} onChange={(e)=>setFile(e.target.files[0])}/>
                <label htmlFor="file-upload" className="upload-btn">Select File <FaPlus/> </label>
    
                <section className="filedetails-section">
                    {file && <div className="file-details">
                        <img src={documenticon} alt="FILE-ICON" className="file-image"/>
                        <h2>FILE-NAME:{file.name}</h2>
                        <button onClick={handleFileUpload}>{functionAction}</button>
                        </div>}
                        {/* <button onClick={handleFileUpload}>Save to Files</button> */}
                </section>
            </div>
        </main>
}