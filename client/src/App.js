import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import JoinRoom from './components/joinroom';
import Poll from './components/poll';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<JoinRoom />} />
        <Route path="/poll/:roomId" element={<Poll />} />
      </Routes>
    </HashRouter>
  );
}

export default App;





