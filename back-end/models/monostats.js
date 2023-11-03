'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MonoStats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      MonoStats.belongsTo(models.Users, {
        foreignKey: 'userID', // The name of the foreign key column in the Mono Stats table
        onDelete: 'CASCADE', // Set the onDelete behavior as needed
        onUpdate: 'CASCADE' // Set the onUpdate behavior as needed
      });
    }
  }
  MonoStats.init({
    userID: DataTypes.INTEGER,
    monoData: DataTypes.JSON
  }, {
    sequelize,
    modelName: 'MonoStats',
  });
  return MonoStats;
};