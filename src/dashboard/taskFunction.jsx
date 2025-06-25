import "./taskFunction.css"
import FunctionCard from "../components/functionCard";
import { Link } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { MdCreateNewFolder } from "react-icons/md";
import icon1 from "../images/icon1.png"
import icon2 from "../images/icon2.png"
import icon3 from "../images/icon3.png"
import icon4 from "../images/icon4.png"
import icon5 from "../images/icon5.png"
import icon6 from "../images/icon6.png"


export default function TaskFunction(){
    return <main className="taskFunction-body">
      <section className="taskFunction-holder">

      <Link to="/app/uploadfile" className=" w-[40%] h-[70%] md:w-[25%] no-underline">
      <FunctionCard task={"Upload PDF"} description={'Easily upload PDF files to begin organizing, merging, or converting.'} icon={icon6}/>
      </Link>

      <Link to="/app/createfolder" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Create Folder"} description={'Organize your PDF files by creating and managing folders effortlessly.'} icon={icon3}/>
      </Link>

      <Link to="/app/jpgpdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert PDF to JPG"} description={'Transform PDF pages into JPG images.'} icon={icon4}/>
      </Link>

      <Link to="/app/pdfaudio" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert PDF to Audio"} description={'Convert PDF documents into audio files for easy listening anytime.'} icon={icon2}/>
      </Link>

      <Link className=" w-[40%] md:w-[25%] no-underline">
            <FunctionCard task={"Share PDF"} description={'Quickly share PDF files with others through secure links or email.'} icon={icon5}/>
      </Link>

      <Link to="/app/mergepdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Merge PDF"} description={'Combine PDFs into a single file in just a few simple steps.'} icon={icon1}/>
      </Link>
      </section>
    </main>
}