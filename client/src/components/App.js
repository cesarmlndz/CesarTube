import '../style.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Main from './Main';
import UploadVideo from './UploadVideo';

export default function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Navigate replace to='/84e96018-4022-434e-80bf-000ce4cd12b8' />}/>
        <Route path='/:videoId' element={<Main />}/>
        <Route path='/upload' element={<UploadVideo />}/>
      </Routes>
    </div>
  );
}

