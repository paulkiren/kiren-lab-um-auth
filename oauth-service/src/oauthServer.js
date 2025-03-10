const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth = new OAuth2Server({
  model: require('./model'), // Implement the model methods
  accessTokenLifetime: 3600,
  allowBearerTokensInQueryString: true
});

module.exports = {
  oauth,
  Request,
  Response
};
