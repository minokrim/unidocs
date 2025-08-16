import React, { useState } from 'react';
import HomeOne from "../src/homepage/hom"
import UploadFiles from './functionpages/uploadfile';
import Files from './dashboard/files';
import Jpgpdf from './functionpages/jpgpdf';
import Pdfaudio from './functionpages/pdfaudio';
import Mergepdf from './functionpages/mergepdf';
import CreateFolder from './functionpages/createfolder';
import AllDocuments from './documents/allDocs';
import Settings from './setting/setting';
import AllFolders from './folder/folder';
import UserProvider from './context/userProvider';
import FolderProvider from './context/folderProvider';
import SharedLayout from './components/sharedlayout';
import FolderFiles from './folder/folderFile';
import { HashRouter,Routes,Route} from 'react-router-dom';
import ViewDoc from './documents/viewdoc';
function App() {
  const[frameData,setFrameData]=useState("");

  return (
    <div>
      <HashRouter>
      <UserProvider>
        <FolderProvider>
        <Routes>
          <Route path="/" element={<HomeOne/>}/>
          <Route path='/app' element={<SharedLayout />}>
          <Route index element={<Files />} /> 
          <Route path="files" element={<Files/>} />
          <Route path="documents" element={<AllDocuments setFrameData={setFrameData}/>} />
          <Route path="folders" element={<AllFolders/>} />
          <Route path="settings" element={<Settings />} />
          <Route path="mergepdf" element={<Mergepdf />} />
          <Route path="pdfaudio" element={<Pdfaudio />} />
          <Route path="jpgpdf" element={<Jpgpdf />} />
          <Route path="uploadfile" element={<UploadFiles />} />
          <Route path="createfolder" element={<CreateFolder />} />
          <Route path="folderfile" element={<FolderFiles/>} />
          <Route path="viewdoc" element={<ViewDoc frameData={frameData}/>} />
          </Route>
          </Routes>
        </FolderProvider>
        </UserProvider>
      </HashRouter>
    </div>

  );
}

export default App;