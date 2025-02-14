// src/App.js
import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login";
import LandingPage from "./components/LandingPage";
import MainLayout from "./components/MainLayout";
import Tracker from "./components/Tracker";
import HourCalculator from "./components/HourCalculator";
import Dashboard from "./components/Dashboard"; // if you still want to use it

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
        {/* Redirect root path to /landing or /login */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/landing" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Login Route */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Landing Page (first screen after login) */}
        <Route
          path="/landing"
          element={
            token ? <LandingPage /> : <Navigate to="/login" replace />
          }
        />

        {/* Main Layout - all sub-routes are nested */}
        <Route
          path="/main"
          element={
            token ? (
              <MainLayout handleLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          {/* Example nested routes under /main */}
          <Route path="tracker" element={<Tracker token={token} />} />
          <Route path="hour-calculator" element={<HourCalculator />} />
          <Route path="dashboard" element={<Dashboard token={token} />} />
          {/* Fallback to tracker if user just goes to /main */}
          <Route index element={<Navigate to="tracker" replace />} />
        </Route>

        {/* Catch-all for 404s */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
