// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Tracker from './components/Tracker';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  // Update the background image URL to point to your background1 image.
  // Since background1.jpg is placed in the public folder, reference it as '/background1.jpg'.
  const appStyle = {
    backgroundImage: "url('/background1.jpg')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '100vh',
  };

  return (
    <Router>
      <div style={appStyle}>
        {token && <button className="logout-button" onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/tracker" element={token ? <Tracker token={token} /> : <Navigate to="/login" />} />
          <Route path="/dashboard" element={token ? <Dashboard token={token} /> : <Navigate to="/login" />} />
          <Route path="*" element={<Navigate to={token ? "/tracker" : "/login"} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
