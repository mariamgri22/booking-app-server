'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AvailableHours extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  AvailableHours.init({
    hours: DataTypes.JSON,
    calendarId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'AvailableHours',
  });
  return AvailableHours;
};