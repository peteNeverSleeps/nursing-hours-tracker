// src/components/LandingPage.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css"; // or wherever your CSS is

function LandingPage() {
  const navigate = useNavigate();

  const handleTileClick = () => {
    // Navigate to the main dashboard layout
    navigate("/main");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Hello, Alexis!</h1>
      <div className="landing-tiles-container">
        {/* One tile that looks like "pretty-adaptation" in Railway */}
        <div className="landing-tile" onClick={handleTileClick}>
          <h2>Nursing Hours Tracker</h2>
          <p>Click to Open</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
