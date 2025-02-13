const { Sequelize } = require("sequelize");
require("dotenv").config(); // Load environment variables

// Ensure DATABASE_URL exists
if (!process.env.DATABASE_URL) {
  throw new Error("Missing DATABASE_URL environment variable");
}

// Initialize Sequelize
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  logging: false, // Disable logging to keep logs clean
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Required for Railway
    },
  },
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
