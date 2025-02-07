const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

app.use(express.json());

// In-memory store for reference tokens and their corresponding JWTs
const tokenStore = new Map();

// Endpoint to issue tokens
app.post('/oauth/token', (req, res) => {
  const { client_id, client_secret } = req.body;

  // Validate client credentials (simplified for example)
  if (client_id !== 'my-client' || client_secret !== 'my-secret') {
    return res.status(401).json({ error: 'Invalid client credentials' });
  }

  // Create a reference token (random string)
  const referenceToken = Math.random().toString(36).substring(2);

  // Create a JWT with user claims
  const jwtToken = jwt.sign(
    { userId: 123, roles: ['user'] }, // Payload
    'my-secret-key',                 // Secret key
    { expiresIn: '1h' }              // Expiration
  );

  // Store the reference token and JWT mapping
  tokenStore.set(referenceToken, jwtToken);

  // Return the reference token to the client
  res.json({ access_token: referenceToken, token_type: 'Bearer' });
});

// Endpoint to exchange reference token for JWT
app.post('/oauth/introspect', (req, res) => {
  const { token } = req.body;

  // Look up the JWT for the given reference token
  const jwtToken = tokenStore.get(token);

  if (!jwtToken) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  // Return the JWT to the API
  res.json({ jwt: jwtToken });
});

app.listen(3000, () => console.log('Identity Server running on port 3000'));