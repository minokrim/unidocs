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
            ],
datasets: [{
    label: 'My First Dataset',
    data: [fileCount, folderCount],
    backgroundColor: [
      'rgb(230, 230, 240)',
      'rgb(127, 255, 212)',
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
    <div className="w-flex flex-col">
      <section className="flex flex-col w-full items-center justify-center">
      <Dash/>
      <TaskFunction/>
      </section>

      <section className="flex flex-col md:flex-row py-5 justify-around">

        <div className="h-[20em] md:w-[25em] rounded-lg p-2 bg-gradient-to-b from-black to-purple-950">
          <TopFile onFileCountUpdate={setFileCount}/>        
        </div>
        
        <div className="h-[20em] md:w-[25em] rounded-lg p-2 bg-gradient-to-b from-black to-purple-950">
          <TopFolder onFolderCount={setFolderCount}/>
        </div>
        

        <div className="h-[20em] md:w-[25em] rounded-lg bg-gradient-to-b from-black to-purple-950">
          <Doughnut data={data} options={options}/>
      </div>
      </section>
    </div>
    
  );
}
