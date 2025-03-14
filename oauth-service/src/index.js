const express = require('express');
const bodyParser = require('body-parser');
const { token } = require('./controllers/authController');
const { oauth, Request, Response } = require('./oauthServer');

const app = express();

app.use(bodyParser.json());

app.post('/users/register', (req, res) => {
  // Handle user registration
  const { username, password, email } = req.body;
  // Add user to the database
  res.status(201).send('User registered successfully');
});

app.post('/clients/register', (req, res) => {
  // Handle client registration
  const { clientId, clientSecret } = req.body;
  // Add client to the database
  res.status(201).send('Client registered successfully');
});

app.post('/oauth/token', token);

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