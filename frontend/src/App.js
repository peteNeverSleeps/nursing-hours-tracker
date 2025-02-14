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
import Dashboard from "./components/Dashboard"; // If you still want it

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
        {/* Root path: if logged in, go to /landing, otherwise /login */}
        <Route
          path="/"
          element={
            token ? <Navigate to="/landing" replace /> : <Navigate to="/login" replace />
          }
        />

        {/* Login route => your existing Login component */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />

        {/* Landing page => visible only if logged in */}
        <Route
          path="/landing"
          element={
            token ? <LandingPage /> : <Navigate to="/login" replace />
          }
        />

        {/* The "main" layout => also only if logged in */}
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
          {/* Nested routes under /main */}
          <Route path="tracker" element={<Tracker token={token} />} />
          <Route path="hour-calculator" element={<HourCalculator />} />
          {/* If using Dashboard */}
          <Route path="dashboard" element={<Dashboard token={token} />} />

          {/* Default child route if just "/main" */}
          <Route index element={<Navigate to="tracker" replace />} />
        </Route>

        {/* Catch-all for unknown routes */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
