const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// Middleware to validate the reference token and get the JWT
const validateToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const referenceToken = authHeader.split(' ')[1];

  try {
    // Exchange reference token for JWT
    const response = await axios.post('http://localhost:3000/oauth/introspect', {
      token: referenceToken,
    });

    // Attach the JWT to the request object
    req.jwt = response.data.jwt;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Example protected endpoint
app.get('/orders', validateToken, (req, res) => {
  // Decode the JWT to get user claims
  const decoded = jwt.verify(req.jwt, 'my-secret-key');

  // Check user roles or other claims
  if (!decoded.roles.includes('user')) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Return some data
  res.json({ orders: [{ id: 1, item: 'Product A' }] });
});

app.listen(4000, () => console.log('Orders API running on port 4000'));