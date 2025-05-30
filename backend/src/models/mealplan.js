const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const MealPlan = sequelize.define('MealPlan', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  creationDate: {
    type: DataTypes.STRING
  },
  currentDate: {
    type: DataTypes.STRING
  },
  meals: {
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
  tableName: 'mealPlan',
  timestamps: false
});

module.exports = MealPlan;