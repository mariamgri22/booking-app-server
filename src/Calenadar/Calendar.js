const sequelize = require("../config/database");
const CreatedService = require("../CreatedService/CreatedService");
const Service = require("../Service/Service");
const { DataTypes, Model } = require("sequelize");

class Calendar extends Model {}

Calendar.init(
  {
    day: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Calendar",
  }
);

Calendar.hasMany(CreatedService, { foreignKey: "calendarId" });
CreatedService.belongsTo(Calendar, { foreignKey: "calendarId" });

Calendar.hasMany(Service, { foreignKey: "calendarId" });
Service.belongsTo(Calendar, { foreignKey: "calendarId" });

module.exports = Calendar;
