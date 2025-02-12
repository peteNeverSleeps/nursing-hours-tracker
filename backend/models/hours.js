// models/hours.js
module.exports = (sequelize, DataTypes) => {
    const Hours = sequelize.define('Hours', {
      // Each entry logs hours for a particular day/rotation.
      rotation: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      hoursLogged: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      patientsCount: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      entryDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      }
    });
  
    return Hours;
  };
  