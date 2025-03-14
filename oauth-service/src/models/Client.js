// filepath: /Users/AZT251220/Documents/Projects/Kiren-labs/kiren-lab-um-auth/oauth-service/src/models/Client.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Client = sequelize.define('Client', {
  clientId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  clientSecret: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Client;