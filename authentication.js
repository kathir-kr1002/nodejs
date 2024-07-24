// server.js
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const app = express();
const port = 4000;
const SECRET_KEY = 'your_secret_key'; // Use a strong key and keep it secret

app.use(bodyParser.json());

// Dummy user store (In a real application, use a database)
const users = [];

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  
  if (token) {
    jwt.verify(token, SECRET_KEY, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Route to register a new user
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  
  // Save user (in real app, save to a database)
  users.push({ username, password: hashedPassword });
  
  res.status(201).send('User registered');
});

// Route to log in
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);
  
  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ username: user.username }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ token });
  } else {
    res.status(401).send('Invalid credentials');
  }
});

// Protected route
app.get('/protected', authenticateJWT, (req, res) => {
  res.send('This is a protected route');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
