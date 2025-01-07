import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InfoPage from './components/InfoPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path='/home' element={<InfoPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
