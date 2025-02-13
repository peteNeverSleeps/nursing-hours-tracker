// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Tracker from './components/Tracker';
import Dashboard from './components/Dashboard';
import background from './assets/background.jpg';


function App() {
  // Simple auth state stored in memory; in production, consider using Context or Redux.
  const [token, setToken] = useState(localStorage.getItem('token') || null);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  return (
    <Router>
      <div>
        {token && <button onClick={handleLogout}>Logout</button>}
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
