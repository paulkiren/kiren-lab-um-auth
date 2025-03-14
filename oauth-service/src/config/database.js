// filepath: /Users/AZT251220/Documents/Projects/Kiren-labs/kiren-lab-um-auth/oauth-service/src/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;