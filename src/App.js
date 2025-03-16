import React, { useEffect, useState } from 'react';
import axios from "axios"
import Dashboard from './dashboard/dashboard';
<<<<<<< HEAD
import HomeOne from "../src/homepage/hom"
import UploadFiles from './functionpages/uploadfile';
import Up from './up/up';
import Dash from './dashboard/dash';
import UserProvider from './context/userProvider';
import { HashRouter,Routes,Route} from 'react-router-dom';
import Jpgpdf from './functionpages/jpgpdf';
import Pdfaudio from './functionpages/pdfaudio';
=======
import HomePage from './homepage/homepage';
import { HashRouter,Route,Routes } from 'react-router-dom';
export const userContext=React.createContext();

>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
function App() {

  const [user,setUser]=useState()

  useEffect(()=>{
    axios.get("http://localhost:5000/session",{withCredentials:true})
    .then((response)=>{
      setUser(response.data.email);
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div>
      <HashRouter>
      <userContext.Provider value={user}>
        <Routes>
        <Route path='/' element={<HomeOne/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
<<<<<<< HEAD
        <Route path='/fileUpload' element={<UploadFiles/>}/>
        <Route path='/jpg-pdf' element={<Jpgpdf/>}/>
        <Route path='/pdf-audio' element={<Pdfaudio/>}/>
=======
        
>>>>>>> 8c2e6fc33f807d72434db578ba68512d3b536eda
        </Routes>
        </userContext.Provider>
      </HashRouter>
    </div>

  );
}

export default App;