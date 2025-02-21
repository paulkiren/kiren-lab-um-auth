const express = require('express');
const app = express();
const port = 3000;

// Middleware for request validation, rate limiting, etc.

// Route requests to appropriate services
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/email', require('./routes/email'));

// Start the server
app.listen(port, () => {
  console.log(`API Gateway running on port ${port}`);
});
