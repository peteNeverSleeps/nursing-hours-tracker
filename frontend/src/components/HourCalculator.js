// src/components/HourCalculator.js
import React, { useState } from "react";
import "../styles.css";

function HourCalculator() {
  const [data, setData] = useState([
    { rotation: "Clinical A", hours: 5 },
    { rotation: "Clinical B", hours: 7 }
  ]);

  const totalHours = data.reduce((acc, row) => acc + row.hours, 0);

  const handleChange = (index, newVal) => {
    const updated = [...data];
    updated[index].hours = parseFloat(newVal) || 0;
    setData(updated);
  };

  return (
    <div>
      <h3>Hours Calculator</h3>
      <table>
        <thead>
          <tr>
            <th>Rotation</th>
            <th>Hours</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              <td>{row.rotation}</td>
              <td>
                <input
                  type="number"
                  value={row.hours}
                  onChange={(e) => handleChange(i, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Total Hours: {totalHours}</p>
      <button className="logout-button" style={{ marginTop: "1rem" }}>
        Save
      </button>
    </div>
  );
}

export default HourCalculator;
