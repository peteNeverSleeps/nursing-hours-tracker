// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      onLogin(data.token);
      navigate('/tracker'); // Automatically navigate to Tracker page
    } catch (error) {
      alert('Login failed. Please check your credentials.');
      console.error(error);
    }
  };

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: 'purple', fontSize: '2rem' }}>Login</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
        
        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <div style={{ width: '100%', marginBottom: '1rem' }}>
          <label style={{ display: 'block', fontWeight: 'bold' }}>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '0.5rem', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            backgroundColor: 'purple', 
            color: 'white', 
            padding: '0.7rem', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: 'pointer', 
            width: '100%' 
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
