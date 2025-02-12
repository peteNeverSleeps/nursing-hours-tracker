// models/index.js
const { Sequelize } = require('sequelize');

// Use environment variables for configuration in production
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://nursing_tracker_user:eppslex82@localhost:5432/nursing_hours_db', {
  dialect: 'postgres',
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Import models
db.User = require('./user')(sequelize, Sequelize);
db.Hours = require('./hours')(sequelize, Sequelize);

// Define associations
db.User.hasMany(db.Hours, { onDelete: 'CASCADE' });
db.Hours.belongsTo(db.User);

module.exports = db;
