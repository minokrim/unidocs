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
    return <main className="w-[80%] md:w-full flex items-center justify-center mb-2 h-full">
      <section className="flex flex-wrap gap-3 md:gap-5 justify-center items-center md:justify-around">

      <Link to="/app/uploadfile" className="w-[40%] h-[70%] md:w-[25%] no-underline">
      <FunctionCard task={"Upload PDF"} description={'Easily upload PDF files to begin organizing, merging, or converting.'} icon={icon6}/>
      </Link>

      <Link to="/app/createfolder" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Create Folder"} description={'Organize your PDF files by creating and managing folders effortlessly.'} icon={icon3}/>
      </Link>

      <Link to="/app/jpgpdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert JPG to PDF"} description={'Transform PDF pages into JPG images.'} icon={icon4}/>
      </Link>

      <Link to="/app/pdfaudio" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert PDF to Audio"} description={'Convert PDF documents into audio files for easy listening anytime.'} icon={icon2}/>
      </Link>

      <Link to="https://contentsummarizer-1.onrender.com/" target="_blank" className=" w-[40%] md:w-[25%] no-underline">
            <FunctionCard task={"summarize PDF"} description={'Quickly summarize PDF, url, and text with Content-summ.'} icon={icon5}/>
      </Link>

      <Link to="/app/mergepdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Merge PDF"} description={'Combine PDFs into a single file in just a few simple steps.'} icon={icon1}/>
      </Link>
      </section>
    </main>
}