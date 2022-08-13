'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class motorcycle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      motorcycle.belongsTo(models.category)
      motorcycle.hasMany(models.input)
      motorcycle.hasMany(models.report)
    }
  }
  motorcycle.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER,
    transmisi: DataTypes.STRING,
    cc: DataTypes.INTEGER,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate: function(motorcycle, option) {
        motorcycle.stock = 0
      }
    },
    sequelize,
    modelName: 'motorcycle',
  });
  return motorcycle;
};