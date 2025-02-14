import React, { useState } from "react";
import "../styles.css";

function HourCalculator() {
  const [items, setItems] = useState([
    { rotation: "Clinical A", hours: 10 },
    { rotation: "Clinical B", hours: 8 },
  ]);

  const totalHours = items.reduce((acc, i) => acc + i.hours, 0);

  const handleChange = (index, newHours) => {
    const updated = [...items];
    updated[index].hours = parseFloat(newHours) || 0;
    setItems(updated);
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
          {items.map((row, i) => (
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
      <p>Total: {totalHours} hours</p>
    </div>
  );
}

export default HourCalculator;
