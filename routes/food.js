const express = require('express');
const { processText } = require('../controllers/foodController');

const router = express.Router();

router.post('/analyze',  processText);

module.exports = router;