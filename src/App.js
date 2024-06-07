import React from 'react';
import log from 'loglevel';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom'
// import Home from '../src/pages/Home';
import DownloadPage from '../src/pages/DownloadPage';


// Set level log yang diinginkan (error, warn, info, debug, trace)
log.setLevel('info'); // Atur sesuai kebutuhan

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" exact element={<Home />} /> */}
        <Route path="/" exact element={<DownloadPage />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
