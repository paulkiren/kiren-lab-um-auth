const express = require('express');
const app = express();
const port = 3001;

// Middleware for email verification, password reset, etc.

// Routes for email-related operations
app.post('/send-verification', (req, res) => {
  // Handle email verification
  res.send('Verification email sent');
});

app.post('/send-reset', (req, res) => {
  // Handle password reset email
  res.send('Password reset email sent');
});

// Start the server
app.listen(port, () => {
  console.log(`Email Service running on port ${port}`);
});
