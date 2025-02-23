import NavDash from "../nav/sidenav";
// import SearchNav from "../nav/topnav";
import Navcombo from "../nav/navcombo";
import "./dashboard.css"
import Files from "./files";
import UploadFiles from "../functionpages/uploadfile";
import Jpgpdf from "../functionpages/jpgpdf";
import Pdfaudio from "../functionpages/pdfaudio";
import Mergepdf from "../functionpages/mergepdf";
import Up from "../up/up";
import CreateFolder from "../functionpages/createfolder";
import AllDocuments from "../documents/allDocs";
 export default function Dashboard({prop}){
    
    return(
        <div className="dashboard">
            <div className="dash2">
            <Navcombo/>
            <AllDocuments/>
            </div>
        </div>
    )
 }