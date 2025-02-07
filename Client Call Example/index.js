const axios = require('axios');

// Get a reference token from the Identity Server
const getReferenceToken = async () => {
  const response = await axios.post('http://localhost:3000/oauth/token', {
    client_id: 'my-client',
    client_secret: 'my-secret',
  });

  return response.data.access_token;
};

// Call the API with the reference token
const callApi = async () => {
  const referenceToken = await getReferenceToken();

  try {
    const apiResponse = await axios.get('http://localhost:4000/orders', {
      headers: {
        Authorization: `Bearer ${referenceToken}`,
      },
    });

    console.log('API Response:', apiResponse.data);
  } catch (error) {
    console.error('API Error:', error.response.data);
  }
};

callApi();