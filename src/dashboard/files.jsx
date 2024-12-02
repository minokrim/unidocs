import "./files.css";
import { RiFileUploadFill } from "react-icons/ri";
import TopFile from "../uploadFile/topfile";
export default function Files() {

  return (
    
    <div className="files-con">
      <div className="test">
        <div className="butn-con">
          <button className="butn2">Upload File<RiFileUploadFill className="mb-1 ms-1 up-file"/>
          </button>
        </div>
        <div className="cng-con">
          <div className="cng ">
            <div className="w-50 mt-3">
            <p>recent</p>

            </div>
            <div className=" d-flex justify-content-end w-50 mt-3">
            <p className="end">view all</p>

            </div>
          </div>
        </div>
        <div className="fil-con">
        <div className="fil">
          <TopFile/>
        </div>
        </div>
        
      </div>
      <div className="test">
        <div className="butn-con">
          <button className="butn2">Upload File<RiFileUploadFill className="mb-1 ms-1 up-file"/></button>
        </div>
        <div className="cng-con">
          <div className="cng ">
            <div className="w-50 mt-3">
            <p>recent</p>

            </div>
            <div className=" d-flex justify-content-end w-50 mt-3">
            <p className="end">view all</p>

            </div>
          </div>
        </div>
        <div className="fil-con">
        <div className="fil">
          <p> data</p>
        </div>
        </div>
        
      </div>
      <div className="test">
        <div className="butn-con">
          <button className="butn2">Upload File<RiFileUploadFill className="mb-1 ms-1 up-file"/></button>
        </div>
        <div className="cng-con">
          <div className="cng ">
            <div className="w-50 mt-3">
            <p>recent</p>

            </div>
            <div className=" d-flex justify-content-end w-50 mt-3">
            <p className="end">view all</p>

            </div>
          </div>
        </div>
        <div className="fil-con">
        <div className="fil">
          <p> data</p>
        </div>
        </div>
        
      </div>
    </div>
    
  );
}
