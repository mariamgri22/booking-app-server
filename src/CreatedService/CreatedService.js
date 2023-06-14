const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class CreatedService extends Model {}

CreatedService.init(
  {
    calendarId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    serviceId: {
      type: DataTypes.INTEGER,
    },
    hour: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "CreatedService",
  }
);

module.exports = CreatedService;
