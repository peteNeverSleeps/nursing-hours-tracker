import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tracker from "./Tracker";
import HourCalculator from "./HourCalculator";
import "../styles.css";

/**
 * MainLayout shows:
 *  - Top Navbar (purple bar)
 *  - Left "tiles" (sidebar)
 *  - Right "panels" that expand/collapse
 */
function MainLayout({ handleLogout }) {
  const navigate = useNavigate();

  // We keep track of which "panel" is currently open:
  // 'tracker', 'calculator', or null if none are open.
  const [openPanel, setOpenPanel] = useState(null);

  const onLogoutClick = () => {
    if (handleLogout) handleLogout();
    navigate("/login");
  };

  // If user clicks "Tracker," we toggle that panel open or closed
  const handleTrackerClick = () => {
    setOpenPanel((prev) => (prev === "tracker" ? null : "tracker"));
  };

  // If user clicks "Calculator," we toggle that panel open or closed
  const handleCalcClick = () => {
    setOpenPanel((prev) => (prev === "calculator" ? null : "calculator"));
  };

  return (
    <div className="layout-container">
      {/* === TOP NAVBAR === */}
      <nav className="top-nav">
        <div className="nav-left">
          <h2 className="app-title">Nursing Hours Tracker</h2>
        </div>
        <div className="nav-right">
          {/* Example profile icon */}
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

      {/* === BODY (sidebar + right panels) === */}
      <div className="body-container">
        {/* LEFT SIDEBAR with "tiles" */}
        <aside className="sidebar">
          <div
            className={`sidebar-tile ${
              openPanel === "tracker" ? "selected" : ""
            }`}
            onClick={handleTrackerClick}
          >
            Tracker
          </div>
          <div
            className={`sidebar-tile ${
              openPanel === "calculator" ? "selected" : ""
            }`}
            onClick={handleCalcClick}
          >
            Hours Calculator
          </div>
        </aside>

        {/* RIGHT "PANELS" - we have 2 potential panels: Tracker + Calculator */}
        <div className="right-panels">
          {/* Tracker panel */}
          <div
            className={`panel-wrapper ${
              openPanel === "tracker" ? "panel-open" : "panel-closed"
            }`}
          >
            <Tracker />
          </div>

          {/* Hours Calculator panel */}
          <div
            className={`panel-wrapper ${
              openPanel === "calculator" ? "panel-open" : "panel-closed"
            }`}
          >
            <HourCalculator />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;
