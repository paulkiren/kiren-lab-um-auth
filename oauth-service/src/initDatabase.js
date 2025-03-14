// filepath: /Users/AZT251220/Documents/Projects/Kiren-labs/kiren-lab-um-auth/oauth-service/src/initDatabase.js
const sequelize = require('./config/database');
const User = require('./models/User');
const Client = require('./models/Client');

const initDatabase = async () => {
  await sequelize.sync({ force: true });
  console.log('Database synced');
};

initDatabase();