const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Service = require("../Service/Service");
const CreatedService = require("../CreatedService/CreatedService");

class User extends Model {}

User.init(
  {
    username: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    phone:{
      type:DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "user",
  }
);
User.hasMany(CreatedService, { foreignKey: "userId" });
CreatedService.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Service, { foreignKey: "userId" });
Service.belongsTo(User, { foreignKey: "userId" });

module.exports = User;
