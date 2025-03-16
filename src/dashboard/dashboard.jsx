import NavDash from "../nav/sidenav";
// import SearchNav from "../nav/topnav";
import Navcombo from "../nav/navcombo";
import "./dashboard.css"
import Files from "./files";
<<<<<<< HEAD
import UploadFiles from "../functionpages/uploadfile";
import Jpgpdf from "../functionpages/jpgpdf";
import Pdfaudio from "../functionpages/pdfaudio";
import Mergepdf from "../functionpages/mergepdf";
import Up from "../up/up";
import CreateFolder from "../functionpages/createfolder";
import AllDocuments from "../documents/allDocs";
import Footer from "../homepage/footer";
import Settings from "../setting/setting";
 export default function Dashboard({prop}){
    
=======

 export default function Dashboard(){
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
    return(
        <div className="dashboard">
            <NavDash />
            <div className="dash2">
<<<<<<< HEAD
            <Navcombo/>
            <Settings/>
            {/* <AllDocuments/> */}
=======
            <SearchNav />
            <Files />
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
            </div>
            <Footer/>
        </div>
    )
 }