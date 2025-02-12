// src/components/Dashboard.js
import React, { useEffect, useState } from 'react';
import { getHoursEntries } from '../api';

function Dashboard({ token }) {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    getHoursEntries(token).then(data => {
      setEntries(data);
    }).catch(err => console.error(err));
  }, [token]);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Dashboard</h2>
      <p>This section can be used to visualize data (e.g., charts, graphs) based on the logged hours.</p>
      <pre>{JSON.stringify(entries, null, 2)}</pre>
    </div>
  );
}

export default Dashboard;
