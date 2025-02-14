// src/App.js
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import MainLayout from "./components/MainLayout";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            token ? <Navigate to="/landing" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Login */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Landing Page */}
        <Route
          path="/landing"
          element={token ? <LandingPage /> : <Navigate to="/login" replace />}
        />

        {/* Main Layout (Railway-style) */}
        <Route
          path="/main"
          element={
            token ? <MainLayout handleLogout={handleLogout} /> : <Navigate to="/login" replace />
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
