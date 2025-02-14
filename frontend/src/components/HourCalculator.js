import React, { useState } from "react";
import "../styles.css";

function HourCalculator() {
  const [tableData, setTableData] = useState([
    { rotation: "Clinical A", hours: 10 },
    { rotation: "Clinical B", hours: 8 },
    { rotation: "Clinical C", hours: 12 },
  ]);

  // Example total
  const totalHours = tableData.reduce((acc, row) => acc + row.hours, 0);

  const handleHoursChange = (index, newHours) => {
    const updated = [...tableData];
    updated[index].hours = parseFloat(newHours) || 0;
    setTableData(updated);
  };

  // "Save" example: post to the backend
  const handleSave = () => {
    console.log("Saving hourCalculator data...", tableData);
    // Example fetch call:
    // fetch("/api/hourcalc/save", { method: 'POST', ... })
  };

  return (
    <div>
      <h2>Hours Calculator</h2>
      <p>Example table for tracking clinical rotation hours.</p>
      <table className="calc-table">
        <thead>
          <tr>
            <th>Rotation</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, i) => (
            <tr key={i}>
              <td>{row.rotation}</td>
              <td>
                <input
                  type="number"
                  value={row.hours}
                  onChange={(e) => handleHoursChange(i, e.target.value)}
                  style={{ width: "80px" }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        <strong>Total Hours:</strong> {totalHours}
      </p>
      <button onClick={handleSave} className="logout-button">
        Save
      </button>
    </div>
  );
}

export default HourCalculator;
