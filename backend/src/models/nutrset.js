const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const NutrSet = sequelize.define('NutrSet', {
  bmr: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  dailyCalories: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  proteinGoal: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  fatsGoal: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  carbohydratesGoal: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,   // ставим первичный ключ по user_id, если в таблице нет id
    allowNull: false,
    references: {
      model: 'person',
      key: 'id'
    }
  }
}, {
  tableName: 'nutritionSettings',
  timestamps: false
});

module.exports = NutrSet;