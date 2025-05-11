import "./files.css";
import TopFile from "../uploadFile/topfile";
import TaskFunction from "./taskFunction";
import Dash from "./dash";
import TopFolder from "../uploadFile/topFolder";
export default function Files() {

  return (
    <div className="files-con">
      <Dash/>
      <TaskFunction/>

      <section className="home-containers">
      <div className="test">
        <div className="cng-con">
        </div>
        <div className="fil-con">

        <div className="fil fill-cont">
          <TopFile/>
        </div>
        
        </div>
        
      </div>

      <div className="test">
        <div className="fil-con">
        <div className="fil fill-cont">
          <TopFolder/>
        </div>
        </div>
        
      </div>

      <div className="test">
        <div className="fil-con">
        <div className="fil fill-cont">

        </div>
        </div>
      </div>
      </section>
    </div>
    
  );
}
