import React from 'react';
import HomePage from './pages/HomePage';
import TentangPage from './pages/TentangPage';
import TeamPage from './pages/TeamPage';
import FiturPage from './pages/FiturPage';
import LoginPage from './pages/LoginPage';
import Navbar from './compenents/Navbar';

import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="min-h-screen bg-blue-100">
     {/* Navbar */}
     <Navbar>
      
     </Navbar>
     
     {/* Main Content */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tentang" element={<TentangPage />} />
        <Route path="/fitur" element={<FiturPage />} />
        <Route path="/team" element={<TeamPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>

     {/* Footer */}
     {/* <footer>
      
     </footer> */}
   
    </div>
  );
}

export default App;