const mongoose = require('mongoose');

const scoreSchema = new mongoose.Schema({
    score: Number,
    difficulty: {
      type: String,
      enum: ['easy', 'medium', 'hard'],
      required: true
    },
    playedAt: {
      type: Date,
      default: Date.now
    }
  }, { collection: 'game_scores' });
  
  const Score = mongoose.model('GameScore', scoreSchema);
  