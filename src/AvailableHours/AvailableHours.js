const sequelize = require("../config/database");
const { Sequelize, DataTypes, Model } = require("sequelize");

class AvailableHours extends Model {}

AvailableHours.init(
  {
    hours: {
      type: DataTypes.JSON,
    },
    calendarId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "AvailableHours",
  }
);

module.exports = AvailableHours;

