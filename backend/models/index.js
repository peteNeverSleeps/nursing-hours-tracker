require('dotenv').config(); // Load environment variables

const { Sequelize } = require("sequelize");

if (!process.env.DATABASE_URL) {
  throw new Error("❌ DATABASE_URL is missing! Check your .env file.");
}

// Use DATABASE_URL from environment variables
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disable logging for cleaner output
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require("./user")(sequelize, Sequelize);
db.Hours = require("./hours")(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Hours, { onDelete: "CASCADE" });
db.Hours.belongsTo(db.User);

module.exports = db;
