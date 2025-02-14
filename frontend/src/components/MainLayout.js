import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Tracker from "./Tracker";
import HourCalculator from "./HourCalculator";
import "../styles.css";

/**
 * MainLayout:
 *  - Top Navbar
 *  - Left rail with "Tracker" and "Hour Calculator" tiles
 *  - Visible right panel that shows whichever tile is selected
 */
function MainLayout({ handleLogout }) {
  const navigate = useNavigate();

  // We'll store the "selected tile" in local state.
  // By default, let's show the Tracker.
  const [selectedTile, setSelectedTile] = useState("tracker");

  const onLogoutClick = () => {
    if (handleLogout) handleLogout();
    navigate("/login");
  };

  // If user clicks "Tracker"
  const handleTrackerClick = () => {
    setSelectedTile("tracker");
  };

  // If user clicks "Hour Calculator"
  const handleCalcClick = () => {
    setSelectedTile("calculator");
  };

  // Decide what to render on the right side based on the selected tile
  let rightPanelContent;
  if (selectedTile === "tracker") {
    rightPanelContent = <Tracker />;
  } else if (selectedTile === "calculator") {
    rightPanelContent = <HourCalculator />;
  } else {
    rightPanelContent = null;
  }

  return (
    <div className="layout-container">
      {/* === TOP NAVBAR === */}
      <nav className="top-nav">
        <div className="nav-left">
          <h2 className="app-title">Nursing Hours Tracker</h2>
        </div>
        <div className="nav-right">
          {/* Profile icon (placeholder) */}
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

      {/* === BODY (Left Sidebar + Right Panel) === */}
      <div className="body-container">
        {/* Left Sidebar */}
        <aside className="sidebar">
          <div
            className={`sidebar-tile ${
              selectedTile === "tracker" ? "selected" : ""
            }`}
            onClick={handleTrackerClick}
          >
            Tracker
          </div>
          <div
            className={`sidebar-tile ${
              selectedTile === "calculator" ? "selected" : ""
            }`}
            onClick={handleCalcClick}
          >
            Hour Calculator
          </div>
        </aside>

        {/* Right side => the selected tile's panel is always visible */}
        <main className="main-content">
          {rightPanelContent}
        </main>
      </div>
    </div>
  );
}

export default MainLayout;
