const { Request, Response } = require('oauth2-server');
const oauth = require('../oauthServer');

module.exports.token = (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth
    .token(request, response)
    .then((token) => {
      res.json(token);
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
};