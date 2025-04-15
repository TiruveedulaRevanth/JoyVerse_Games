const express = require('express');
const router = express.Router();
const Word = require('../models/Word');

// GET /api/words/:difficulty
router.get('/:difficulty', async (req, res) => {
  const { difficulty } = req.params;

  try {
    const words = await Word.find({ difficulty });
    res.json(words);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch words' });
  }
});

module.exports = router;
