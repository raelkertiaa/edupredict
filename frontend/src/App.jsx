import React from 'react';
import HomePage from './pages/HomePage';
import TeamPage from './pages/TeamPage';
import LoginGuruPage from './pages/LoginGuruPage';
import LoginSiswaPage from './pages/LoginSiswaPage';
import Navbar from './compenents/Navbar';
import Footer from './compenents/Footer';

import { Routes, Route, useLocation } from 'react-router-dom';

function App() {
  const location = useLocation();
  const hideLayout = ['/login-guru', '/login-siswa'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">
     {!hideLayout && <Navbar />}
     
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/team" element={<TeamPage />} />
          <Route path="/login-guru" element={<LoginGuruPage />} />
          <Route path="/login-siswa" element={<LoginSiswaPage />} />
        </Routes>
      </div>

     {!hideLayout && <Footer />}
    </div>
  );
}

export default App;