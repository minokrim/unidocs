import React, { useState, useContext } from "react";
import axios from "axios";
import "./uploadfile.css";
import DefaultFunction from "./functionDefault";
import { userContext } from "../context/userProvider";
import Swal from "sweetalert2";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function UploadFiles() {
  const [file, setFile] = useState(null);
  const [metaData, setMetaData] = useState("");
  const { user, loading: userLoading, user_id } = useContext(userContext);
  const[loading,setLoading]=useState(false)
  const loader=<DotLottieReact src="https://lottie.host/47714d5d-ab3c-4526-a8a1-ea14efc374f6/ohWfgGu9EF.lottie" loop autoplay className="w-auto h-[30em]"/>

  function handleFileUpload(e) {
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", file.name);
    formData.append("userId", user.id);

    if (!userLoading && user.id) {
      setLoading(true)
      axios
        .post("https://unidocs-ukv1.onrender.com/document/api/upload/file/metadata", formData,{headers:{"Content-Type":"multipart/formData"},withCredentials:true})
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "File has been uploaded",
            showConfirmButton: false,
            timer: 1500,
          });
          setFile(null);
          setLoading(false)

        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "File upload failed",
            text: "Try again",
          });
          setLoading(false)
        });
    }
  }

  return (
    <main>
      {loading ? loader: <DefaultFunction
        functionName={"upload File"}
        handleFileUpload={handleFileUpload}
        filestate={file}
        setFile={setFile}
        file={file}
        functionAction={"Upload File"}
      />}
    </main>
  );
}
