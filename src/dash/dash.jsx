import "./dash.css";
import Upnav from "../up/upnav"
import { File } from "../dashboardf";
export default function Dash() {
  return (
     <div>
      <Upnav />
    <div className="dash-con">
     
      <div className="text-con">
        <h1 className="aa">Everything you need for file management</h1>
        <h5 className="bb">
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE
          and easy to use! Merge, split, compress, convert, rotate, unlock and
          watermark PDFs with just a few click..
        </h5>
      </div>

<File />
    </div>
    </div>
  );
}
