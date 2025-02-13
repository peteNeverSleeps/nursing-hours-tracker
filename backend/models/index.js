const { Sequelize } = require("sequelize");

// Use environment variables for database connection
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
