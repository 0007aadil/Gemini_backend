const express = require('express');
const router = express.Router();
const { handleChat, getInvestmentSuggestions } = require('../controllers/chatController');

router.post('/', handleChat); // Basic Chat
router.post('/suggest-investments', getInvestmentSuggestions); // Investment Recommendation

module.exports = router;
