// filepath: /Users/AZT251220/Documents/Projects/Kiren-labs/kiren-lab-um-auth/oauth-service/src/oauthServer.js
const OAuth2Server = require('oauth2-server');
const jwt = require('jsonwebtoken');
const User = require('./models/User');
const Client = require('./models/Client');

const oauth = new OAuth2Server({
  model: {
    getClient: async (clientId, clientSecret) => {
      const client = await Client.findOne({ where: { clientId, clientSecret } });
      return client ? client.toJSON() : null;
    },
    getUser: async (username, password) => {
      const user = await User.findOne({ where: { username, password } });
      return user ? user.toJSON() : null;
    },
    saveToken: async (token, client, user) => {
      const accessToken = jwt.sign({ userId: user.id, clientId: client.clientId }, 'secret', { expiresIn: '1h' });
      return { accessToken, client, user };
    },
    getAccessToken: async (accessToken) => {
      try {
        const decoded = jwt.verify(accessToken, 'secret');
        const user = await User.findByPk(decoded.userId);
        const client = await Client.findOne({ where: { clientId: decoded.clientId } });
        return { accessToken, client, user };
      } catch (err) {
        return null;
      }
    },
  },
});

module.exports = { oauth, Request: OAuth2Server.Request, Response: OAuth2Server.Response };