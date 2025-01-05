import "../up/up.css";
import { FaArrowUp } from "react-icons/fa";
import Upnav from "./upnav";

export default function Up(){
return(
<div>
<div className="up-con">
      <div className="text-up">
        <h1 className="aaaa">Everything you need for file management</h1>
        <h5 className="bbbb">
          Every tool you need to use PDFs, at your fingertips. All are 100% FREE
          and easy to use! Merge, split, compress, convert, rotate, unlock and
          watermark PDFs with just a few clicks.
        </h5>
      </div>
      <button className="up-button mt-4">
Upload Content <FaArrowUp className="ms-2"/>
      </button>
      <p className="text-secondary">Or drop content here</p>
    </div>
</div>


)
}