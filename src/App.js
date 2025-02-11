import { BrowserRouter, Routes, Route} from 'react-router-dom';

import './App.css';
import './UI.css';
import Applayout from './Applayout';
import UserGroups from './Pages/Group/UserGroups';
import 'devextreme/dist/css/dx.common.css';
import 'devextreme/dist/css/dx.light.css';
import Devpg from './Pages/Devext/Devpg';
//import Devnew from './Pages/Devext/Devnew';

function App() {
  return (
<div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Applayout/>}>
              <Route path='group' element={<UserGroups/>}></Route>
              <Route path='devpg' element={<Devpg/>}></Route>
            </Route>
          </Routes>

        
        </BrowserRouter>
    </div>
  );
}

export default App;
