import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import './UI.css';
import Applayout from './Applayout';
import UserGroups from './Pages/Group/UserGroups';
import Dev from './Pages/Devext/Dev';
import Devweb from './Devweb';
import Devn from './Pages/Devext/Devn';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Dev1 from './Pages/Devext/Dev1';
import Devweb1 from './Pages/Devext/Devweb1';
import Devpg from './Pages/Devext/Devpg';
//import Devnew from './Pages/Devext/Devnew';

function App() {
  return (
<div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Applayout/>}>
              <Route path='group' element={<UserGroups/>}></Route>
              <Route path='grn' element={<Devn/>}></Route>
              <Route path='dev' element={<Dev/>}></Route>
              <Route path='devpg' element={<Devpg/>}></Route>
              <Route path='dev1' element={<Dev1/>}></Route>
              <Route path='devw' element={<Devweb1/>}></Route>
            </Route>
          </Routes>

        
        </BrowserRouter>
    </div>
  );
}

export default App;
