import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import JoinRoom from './components/joinroom';
import Poll from './components/poll';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/poll/:roomId" element={<Poll />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;





