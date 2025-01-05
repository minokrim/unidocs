import React from 'react';
import Dashboard from './dashboard/dashboard';
import HomePage from './homepage/homepage';
import UploadFiles from './functionpages/uploadfile';
import Up from './up/up';
import Dash from './dashboard/dash';
import UserProvider from './context/userProvider';
import { HashRouter,Routes,Route} from 'react-router-dom';
import Jpgpdf from './functionpages/jpgpdf';
function App() {
  return (
    <div>
      <HashRouter>
      <UserProvider>
        <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/fileUpload' element={<UploadFiles/>}/>
        <Route path='/jpg-pdf' element={<Jpgpdf/>}/>
        </Routes>
        </UserProvider>
      </HashRouter>
    </div>

  );
}

export default App;