import React,{useState} from "react";
import TopNav from "./topnav";
import Sidenav from "./sidenav";
import Files from "../dashboard/files";
import UploadFiles from "../functionpages/uploadfile";
import Jpgpdf from "../functionpages/jpgpdf";
import Pdfaudio from "../functionpages/pdfaudio";
import Mergepdf from "../functionpages/mergepdf";
import Up from "../up/up";
import CreateFolder from "../functionpages/createfolder";
import AllDocuments from "../documents/allDocs";
import { Route,Routes,Router } from "react-router-dom";
import Layout from "../components/sharedlayout";

export default function Navcombo(){
          const [show, setShow] = useState(true);
          const handleToggle = () => {
            setShow(!show);
          };

    return <main className="flex flex-col">

    </main>
}