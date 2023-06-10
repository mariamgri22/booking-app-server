const { DataTypes, Model } = require("sequelize");
const sequelize = require("../config/database");

class Service extends Model {}

Service.init(
  {
    description: {
      type: DataTypes.STRING,
    },
    price: {
      type: DataTypes.FLOAT,
    },
    duration: {
      type: DataTypes.STRING,
    },
    category: {
      type: DataTypes.STRING,
    },
    calendarId: {
      type: DataTypes.INTEGER,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize,
    modelName: "Service",
    tableName: "Services",
  }
);

module.exports = Service;
