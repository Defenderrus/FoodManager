const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  birthdate: {
    type: DataTypes.STRING
  },
  sex: {
    type: DataTypes.INTEGER
  },
  height: {
    type: DataTypes.INTEGER
  },
  userweight: {
    type: DataTypes.INTEGER
  },
  activity: {
    type: DataTypes.INTEGER
  },
  goal: {
    type: DataTypes.INTEGER
  },
  mealpreference: {
    type: DataTypes.STRING
  },
  weightHistory: {
    type: DataTypes.STRING
  },
  nutritionHirtory: {
    type: DataTypes.STRING
  },
  lastupdate: {
    type: DataTypes.STRING
  }
}, {
  tableName: 'person',
  timestamps: false
});

module.exports = User;