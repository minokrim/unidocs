import { GrDocumentPdf } from "react-icons/gr";
import "./functionCard.css";
export default function FunctionCard({task,description}) {
  return (
    <div className="cont">
      <div className="row option-holder">
        <div className="files">
          <div className="content-con">
          <div className="content">
            <GrDocumentPdf className="icon-file mb-2"/>
            <p className="fw-bold">{task}</p>
          </div>
          <p className="text-secondary">
            {description}
          </p>
          </div>
        </div>
        
      </div>
    </div>
  );
}
