// src/api.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (username, password) => {
  const res = await axios.post(`${API_URL}/auth/login`, { username, password });
  return res.data;
};

export const register = async (username, password) => {
  const res = await axios.post(`${API_URL}/auth/register`, { username, password });
  return res.data;
};

export const createHoursEntry = async (token, data) => {
  const res = await axios.post(`${API_URL}/hours/update`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};

export const getHoursEntries = async (token) => {
  const res = await axios.get(`${API_URL}/hours`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
