


const { askAI, suggestInvestmentProducts } = require('../utils/gemini');
const db = require('../db');


const handleChat = async (req, res) => {
  const { question } = req.body;
  if (!question || question.trim() === '') {
    return res.status(400).json({ error: 'Question is required' });
  }

  try {
    const answer = await askAI(question);
    await db.query('INSERT INTO queries (question, ai_response) VALUES (?, ?)', [question, answer]);
    res.json({ answer });
  } catch (err) {
    console.error('ChatController Error:', err.message);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


const getInvestmentSuggestions = async (req, res) => {
  const { query } = req.body;
  if (!query || query.trim() === '') {
    return res.status(400).json({ error: 'Investment query is required' });
  }

  try {
    const response = await suggestInvestmentProducts(query);
    await db.query('INSERT INTO queries (question, ai_response) VALUES (?, ?)', [query, response]);
    res.json({ suggestion: response });
  } catch (err) {
    console.error('InvestmentSuggestion Error:', err.message);
    res.status(500).json({ error: 'Failed to fetch investment suggestions' });
  }
};

module.exports = {
  handleChat,
  getInvestmentSuggestions,
};
