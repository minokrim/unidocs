import React from 'react';
import HomeOne from "../src/homepage/hom"
import UploadFiles from './functionpages/uploadfile';
import Files from './dashboard/files';
import Jpgpdf from './functionpages/jpgpdf';
import Pdfaudio from './functionpages/pdfaudio';
import Mergepdf from './functionpages/mergepdf';
import CreateFolder from './functionpages/createfolder';
import AllDocuments from './documents/allDocs';
import Settings from './setting/setting';
import UserProvider from './context/userProvider';
import SharedLayout from './components/sharedlayout';
import { HashRouter,Routes,Route} from 'react-router-dom';
function App() {
  return (
    <div>
      <HashRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<HomeOne/>}/>
          <Route path='/app' element={<SharedLayout />}>
          <Route path="files" element={<Files/>} />
          <Route path="documents" element={<AllDocuments/>} />
          <Route path="settings" element={<Settings />} />
          <Route path="mergepdf" element={<Mergepdf />} />
          <Route path="pdfaudio" element={<Pdfaudio />} />
          <Route path="jpgpdf" element={<Jpgpdf />} />
          <Route path="uploadfile" element={<UploadFiles />} />
          <Route path="createfolder" element={<CreateFolder />} />
          </Route>
          </Routes>
        </UserProvider>
      </HashRouter>
    </div>

  );
}

export default App;