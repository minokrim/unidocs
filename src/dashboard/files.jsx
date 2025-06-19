import "./files.css";
import TopFile from "../uploadFile/topfile";
import TaskFunction from "./taskFunction";
import Dash from "./dash";
import TopFolder from "../uploadFile/topFolder";
import { Doughnut } from 'react-chartjs-2';
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js';
import { useState } from "react";

Chart.register(ArcElement, Tooltip, Legend);

export default function Files() {
  const[fileCount,setFileCount]=useState(null)
  const[folderCount,setFolderCount]=useState(null)

  const data={
    labels:[
              "Files",
              "FOLDERS",
              "Total space"
            ],
datasets: [{
    label: 'My First Dataset',
    data: [fileCount, folderCount, 100],
    backgroundColor: [
      'rgb(230, 230, 240)',
      'rgb(127, 255, 212)',
      'rgb(255, 182, 193)'
    ],
    hoverOffset: 4
  }]
  }

  const options = {
  plugins: {
    legend: {
      labels: {
        color: 'white', 
        font: {
          size: 14,
          weight: 'bold'
        }
      }
    },
    tooltip: {
      bodyColor: 'white', 
      titleColor: 'lightgray' 
    }
  }
};
  return (
    <div className="files-con">
      <Dash/>
      <TaskFunction/>

      <section className="home-containers flex">
      <div className="test">
        <div className="cng-con">
        </div>
        <div className="fil-con">

        <div className="fil fill-cont p-2">
          <TopFile onFileCountUpdate={setFileCount}/>
        </div>
        
        </div>
        
      </div>

      <div className="test">
        <div className="fil-con">
        <div className="fil fill-cont p-2">
          <TopFolder onFolderCount={setFolderCount}/>
        </div>
        </div>
        
      </div>

      <div className="test">
        <div className="fil-con">
        <div className="fil fill-cont">
          <Doughnut data={data} options={options}/>
        </div>
        </div>
      </div>
      </section>
    </div>
    
  );
}
