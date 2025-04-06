
const axios = require('axios');
require('dotenv').config();

const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

const askAI = async (question) => {
  try {
    const response = await axios.post(
      `${GEMINI_API_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: question }] }],
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const reply = response.data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!reply) throw new Error('Empty response from Gemini');
    return reply;
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    throw new Error('Failed to get response from Gemini');
  }
};

// New Function: Suggest Investment Products
const suggestInvestmentProducts = async (userQuery) => {
  const prompt = `
You are a financial advisor. Suggest 3-5 suitable investment products for this user:
"${userQuery}"

Give:
1. Product name (like ELSS, SIP, FD, PPF, etc.)
2. Pros & cons
3. Who it's ideal for (age/income/risk)
Answer in a clear, bullet format.
`;

  return await askAI(prompt);
};

module.exports = {
  askAI,
  suggestInvestmentProducts,
};
