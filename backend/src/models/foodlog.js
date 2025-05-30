const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const FoodLog = sequelize.define('FoodLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  currentDate: {
    type: DataTypes.STRING
  },
  eatenMeals: {
    type: DataTypes.STRING
  },
  dailyPFC: {
    type: DataTypes.STRING
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'person',
      key: 'id'
    }
  }
}, {
  tableName: 'foodLog',
  timestamps: false
});

module.exports = FoodLog;