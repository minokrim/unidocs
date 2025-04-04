import "./dash.css";
import UpNav from "../up/upnav";
import File from "./file";
export default function Dash() {
  return (
    
    <div>
      <UpNav />
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
