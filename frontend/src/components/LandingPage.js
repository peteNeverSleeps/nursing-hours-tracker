import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

function LandingPage() {
  const navigate = useNavigate();

  const handleTileClick = () => {
    // Go to /main to show the "Railway-style" UI
    navigate("/main");
  };

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to the Nursing Hours Tracker</h1>
      <div className="landing-tiles-container">
        <div className="landing-tile" onClick={handleTileClick}>
          <h2>Nursing-Hours-Tracker</h2>
          <p>Click to Open Project</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
