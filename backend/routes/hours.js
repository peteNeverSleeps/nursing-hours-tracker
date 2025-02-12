// routes/hours.js
const express = require('express');
const jwt = require('jsonwebtoken');
const { Hours } = require('../models');

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Middleware to verify token
function authenticateToken(req, res, next) {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // user.id will be available
    next();
  });
}

// Create or update hours entry
router.post('/update', authenticateToken, async (req, res) => {
  try {
    // Expect data: { rotation, hoursLogged, patientsCount, entryDate }
    const { rotation, hoursLogged, patientsCount, entryDate } = req.body;
    // Create a new hours entry linked to the logged-in user
    const entry = await Hours.create({
      rotation,
      hoursLogged,
      patientsCount,
      entryDate,
      UserId: req.user.id
    });
    res.json({ message: 'Entry created', entry });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not update hours' });
  }
});

// Retrieve all hours entries for the logged in user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const entries = await Hours.findAll({ where: { UserId: req.user.id } });
    res.json(entries);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Could not retrieve data' });
  }
});

module.exports = router;
