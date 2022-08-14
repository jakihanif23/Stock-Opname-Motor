'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class input extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      input.belongsTo(models.motorcycle, {foreignKey:'motorcycleId'})
      input.belongsTo(models.category, {foreignKey:'categoryId'})

      //many-to-many
      input.belongsToMany(models.output, {through: models.report})
    }
  }
  input.init({
    motorcycleId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER,
    stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'input',
  });
  return input;
};