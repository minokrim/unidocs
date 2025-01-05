import NavDash from "./navdash";
import SearchNav from "./search";
import "./dashboard.css"
import Files from "./files";
import UploadFiles from "../functionpages/uploadfile";
import Jpgpdf from "../functionpages/jpgpdf";
import Pdfaudio from "../functionpages/pdfaudio";
import Mergepdf from "../functionpages/mergepdf";
import Up from "../up/up";
import CreateFolder from "../functionpages/createfolder";
 export default function Dashboard({prop}){
    
    return(
        <div className="dashboard">
            <div className="dash2">
            <SearchNav/>
            <CreateFolder/>
            </div>
        </div>
    )
 }