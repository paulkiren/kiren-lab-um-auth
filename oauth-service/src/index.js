const express = require('express');
const bodyParser = require('body-parser');
const { oauth, Request, Response } = require('./oauthServer');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/oauth/token', (req, res) => {
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
});

app.get('/secure', (req, res) => {
  const request = new Request(req);
  const response = new Response(res);

  oauth
    .authenticate(request, response)
    .then((token) => {
      res.json({ message: 'Secure data', token });
    })
    .catch((err) => {
      res.status(err.code || 500).json(err);
    });
});

app.listen(3000, () => {
  console.log('OAuth service is running on port 3000');
});