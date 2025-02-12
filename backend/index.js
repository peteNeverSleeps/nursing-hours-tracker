require("dotenv").config(); // Load environment variables
const express = require("express");
const cors = require("cors");
const db = require("./models"); // Import database models

const app = express();
app.use(cors());
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.send("Nursing Hours Tracker Backend is running! 🚀");
});

// Sync database
db.sequelize
  .authenticate()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.log("Database connection error:", err));

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
