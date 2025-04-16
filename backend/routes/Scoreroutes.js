const express = require('express');
const router = express.Router();
const Score = require('../models/Score');

// POST /api/scores/submit
router.post('/submit', async (req, res) => {
  try {
    const { username, score, difficulty } = req.body;

    const newScore = new Score({ username, score, difficulty });
    await newScore.save();

    res.status(201).json({ message: 'Score saved successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to save score' });
  }
});

module.exports = router;
