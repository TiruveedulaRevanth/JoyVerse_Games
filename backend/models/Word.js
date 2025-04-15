const mongoose = require('mongoose');

const wordSchema = new mongoose.Schema({
  word: { type: String, required: true },
  syllables: { type: Number, required: true },
  split: [{ type: String }],
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true }
});

module.exports = mongoose.model('Word', wordSchema);
