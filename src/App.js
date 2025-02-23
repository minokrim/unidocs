import React from 'react';
import Dashboard from './dashboard/dashboard';
import HomeOne from "../src/homepage/hom"
import UploadFiles from './functionpages/uploadfile';
import Up from './up/up';
import Dash from './dashboard/dash';
import UserProvider from './context/userProvider';
import { HashRouter,Routes,Route} from 'react-router-dom';
import Jpgpdf from './functionpages/jpgpdf';
import Pdfaudio from './functionpages/pdfaudio';
function App() {
  return (
    <div>
      <HashRouter>
      <UserProvider>
        <Routes>
        <Route path='/' element={<HomeOne/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/fileUpload' element={<UploadFiles/>}/>
        <Route path='/jpg-pdf' element={<Jpgpdf/>}/>
        <Route path='/pdf-audio' element={<Pdfaudio/>}/>
        </Routes>
        </UserProvider>
      </HashRouter>
    </div>

  );
}

export default App;