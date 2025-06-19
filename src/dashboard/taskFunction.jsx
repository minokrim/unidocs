import "./taskFunction.css"
import FunctionCard from "../components/functionCard";
import { Link } from "react-router-dom";
import { GrDocumentPdf } from "react-icons/gr";
import { MdCreateNewFolder } from "react-icons/md";

export default function TaskFunction(){
    return <main className="taskFunction-body">
      <section className="taskFunction-holder">

      <Link to="/app/uploadfile" className=" w-[40%] h-[70%] md:w-[25%] no-underline">
      <FunctionCard task={"Upload PDF"} description={'Easily upload PDF files to begin organizing, merging, or converting.'}/>
      </Link>

      <Link to="/app/createfolder" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Create Folder"} description={'Organize your PDF files by creating and managing folders effortlessly.'}/>
      </Link>

      <Link to="/app/jpgpdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert PDF to JPG"} description={'Transform PDF pages into JPG images.'}/>
      </Link>

      <Link to="/app/pdfaudio" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Convert PDF to Audio"} description={'Convert PDF documents into audio files for easy listening anytime.'}/>
      </Link>

      <Link className=" w-[40%] md:w-[25%] no-underline">
            <FunctionCard task={"Share PDF"} description={'Quickly share PDF files with others through secure links or email.'}/>
      </Link>

      <Link to="/app/mergepdf" className=" w-[40%] md:w-[25%] no-underline">
      <FunctionCard task={"Merge PDF"} description={'Combine PDFs into a single file in just a few simple steps.'}/>
      </Link>
      </section>
    </main>
}