const { Sequelize } = require("sequelize");

// Use DATABASE_URL for Railway, fallback to local database
const sequelize = new Sequelize(process.env.DATABASE_URL || "postgres://nursing_tracker_user:eppslex82@localhost:5432/nursing_hours_db", {
  dialect: "postgres",
  logging: false, // Disable logging to keep logs clean
  dialectOptions: {
    ssl: process.env.DATABASE_URL ? { require: true, rejectUnauthorized: false } : false, // Use SSL for Railway
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
