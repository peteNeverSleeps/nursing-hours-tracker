// src/components/HourCalculator.js
import React, { useState } from "react";
import "../styles.css";

function HourCalculator() {
  const [tableData, setTableData] = useState([
    { rotation: "Clinical A", hours: 10 },
    { rotation: "Clinical B", hours: 8 },
    { rotation: "Clinical C", hours: 12 },
  ]);

  // Example: Summation
  const totalHours = tableData.reduce((acc, row) => acc + row.hours, 0);

  // Simple change handler
  const handleHoursChange = (index, newHours) => {
    const updatedData = [...tableData];
    updatedData[index].hours = parseFloat(newHours) || 0;
    setTableData(updatedData);
  };

  // "Save" to backend (you would call your API here)
  const handleSave = () => {
    // Example only:
    console.log("Saving hourCalculator data to server...", tableData);

    // e.g. fetch("/api/hourcalc/save", { method: 'POST', body: JSON.stringify(tableData), ... })
  };

  return (
    <div>
      <h3>Hour Calculator</h3>
      <table>
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
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p><strong>Total:</strong> {totalHours} hours</p>
      <button onClick={handleSave}>Save</button>
    </div>
  );
}

export default HourCalculator;
