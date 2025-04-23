// services/nutritionix.js
const axios = require('axios');
require('dotenv').config();

const analyzeFoodText = async (queryText) => {
  try {
    const response = await axios.post(
      'https://trackapi.nutritionix.com/v2/natural/nutrients',
      { query: queryText },
      {
        headers: {
          'x-app-id': process.env.NUTRITIONIX_APP_ID,
          'x-app-key': process.env.NUTRITIONIX_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.foods; // array de alimentos reconocidos
  } catch (error) {
    console.error('Nutritionix error:', error.response?.data || error.message);
    throw error;
  }
};

module.exports = { analyzeFoodText };
