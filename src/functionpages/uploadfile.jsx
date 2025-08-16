import React, { useState, useContext } from "react";
import axios from "axios";
import "./uploadfile.css";
import DefaultFunction from "./functionDefault";
import { userContext } from "../context/userProvider";
import Swal from "sweetalert2";

export default function UploadFiles() {
  const [file, setFile] = useState(null);
  const [metaData, setMetaData] = useState("");
  const { user, loading: userLoading, user_id } = useContext(userContext);

  function handleFileUpload(e) {
    console.log("clicked")
    console.log(user.id)
    if (!file) {
      alert("Please select a file before uploading.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("metadata", file.name);
    formData.append("userId", user.id);

    if (!userLoading && user.id) {
      axios
        .post("http://localhost/document/api/upload/file/metadata", formData)
        .then((response) => {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "File has been uploaded",
            showConfirmButton: false,
            timer: 1500,
          });
          setFile(null);
        })
        .catch((err) => {
          Swal.fire({
            icon: "error",
            title: "File upload failed",
            text: "Try again",
          });
        });
    }
  }

  return (
    <main>
      <DefaultFunction
        functionName={"upload File"}
        handleFileUpload={handleFileUpload}
        filestate={file}
        setFile={setFile}
        file={file}
        functionAction={"Upload File"}
      />
    </main>
  );
}
