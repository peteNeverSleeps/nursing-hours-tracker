// src/components/MainLayout.js
import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles.css";

function MainLayout({ handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    if (handleLogout) {
      handleLogout();
    }
    navigate("/login");
  };

  return (
    <div className="layout-container">
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="nav-left">
          <h2>Railway‐Style Nursing Tracker</h2>
        </div>
        <div className="nav-right">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="profile-icon"
          />
          <button className="logout-button" onClick={onLogoutClick}>
            Logout
          </button>
        </div>
      </nav>

      {/* Body container => Sidebar + Main Content */}
      <div className="body-container">
        {/* Left Sidebar (Project tiles) */}
        <aside className="sidebar">
          {/* Link to your Tracker */}
          <Link to="/main/tracker" className="sidebar-tile">
            Tracker
          </Link>
          {/* Link to Hour Calculator */}
          <Link to="/main/hour-calculator" className="sidebar-tile">
            Hours Calculator
          </Link>
        </aside>

        {/* Main Content (right side) */}
        <main className="main-content">
          {/*
            The <Outlet> is where nested routes (tracker, hour calculator, etc.)
            will render
          */}
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
