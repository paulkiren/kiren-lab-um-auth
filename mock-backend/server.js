const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 8082;

app.use(cors());
app.use(bodyParser.json());

// Mock user data
const mockUser = {
  id: 1,
  name: 'Kiren Paul',
  email: 'kiren.paul@example.com',
  token: 'mocked-jwt-token',
  refreshToken: 'mocked-refresh-token',
};

// Mock login endpoint
app.post('/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (username === 'admin' && password === 'password123') {
    return res.json({ 
      success: true, 
      user: mockUser,
      accessToken: mockUser.token,
      refreshToken: mockUser.refreshToken 
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

// Fetch user profile
app.get('/user/profile', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== `Bearer ${mockUser.token}`) {
    return res.status(403).json({ message: 'Unauthorized' });
  }
  
  return res.json(mockUser);
});

// Start server
app.listen(PORT, () => {
  console.log(`Mock backend running at http://localhost:${PORT}`);
});
