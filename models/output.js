'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class output extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      output.belongsTo(models.motorcycle, {foreignKey:'motorcycleId'})
      output.belongsTo(models.category, {foreignKey:'categoryId'})
      output.belongsToMany(models.input, {through: models.report})
    }
  }
  output.init({
    motorcycleId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'output',
  });
  return output;
};