import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import "../styles.css";

function MainLayout({ handleLogout }) {
  const navigate = useNavigate();

  const onLogoutClick = () => {
    if (handleLogout) {
      handleLogout();
    }
    navigate("/login"); // After logout, go to /login
  };

  return (
    <div className="layout-container">
      {/* Top Navbar */}
      <nav className="top-nav">
        <div className="nav-left">
          <h2 className="app-title">Nursing Hours Tracker</h2>
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

      {/* Main body => Sidebar + Main Content */}
      <div className="body-container">
        {/* Left Sidebar: "tiles" to navigate to different pages */}
        <aside className="sidebar">
          <Link to="/main/tracker" className="sidebar-tile">
            Tracker
          </Link>
          <Link to="/main/hour-calculator" className="sidebar-tile">
            Hours Calculator
          </Link>
        </aside>

        {/* Right side: whichever route is selected (Tracker or HourCalculator) */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
