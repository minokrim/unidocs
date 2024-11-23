import NavDash from "./navdash";
import SearchNav from "./search";
import "./dashboard.css"
import Files from "./files";

 export default function Dashboard(){
    return(
        <div className="dashboard">
            <NavDash />
            <div className="dash2">
            <SearchNav />
            <Files />
            </div>
        </div>
    )
 }