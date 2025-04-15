require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
process.env.MONGO_URI
// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'JoyVerse_data',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ Connected to MongoDB JoyVerse_data'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));
  console.log('Connected to DB:', mongoose.connection.name);




// Define the Word schema and model
const wordSchema = new mongoose.Schema({
  word: String,
  syllables: Number,
  split: [String],
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    required: true
  }
});

const Word = mongoose.model('Word', wordSchema);

// 🌱 Route to seed words (non-destructive)
app.get('/api/seed', async (req, res) => {
  try {
    const sampleWords = [
      // Easy
      { word: 'cat', syllables: 1, split: ['cat'], difficulty: 'easy' },
      { word: 'apple', syllables: 2, split: ['ap', 'ple'], difficulty: 'easy' },
      { word: 'banana', syllables: 3, split: ['ba', 'na', 'na'], difficulty: 'easy' },

      // Medium
      { word: 'elephant', syllables: 3, split: ['el', 'e', 'phant'], difficulty: 'medium' },
      { word: 'computer', syllables: 3, split: ['com', 'pu', 'ter'], difficulty: 'medium' },
      { word: 'umbrella', syllables: 3, split: ['um', 'brel', 'la'], difficulty: 'medium' },

      // Hard
      { word: 'helicopter', syllables: 4, split: ['hel', 'i', 'cop', 'ter'], difficulty: 'hard' },
      { word: 'mathematics', syllables: 4, split: ['math', 'e', 'mat', 'ics'], difficulty: 'hard' },
      { word: 'encyclopedia', syllables: 6, split: ['en', 'cy', 'clo', 'pe', 'di', 'a'], difficulty: 'hard' }
    ];

    await Word.insertMany(sampleWords);
    res.send('🌱 Sample words seeded to MongoDB (existing words not deleted)!');
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).send('Error seeding database');
  }
});

// 🔍 Get words by difficulty
app.get('/api/words/:difficulty', async (req, res) => {
    try {
      const difficulty = req.params.difficulty;
  
      const words = await Word.find({ difficulty });
  
      res.json(words);
    } catch (err) {
      console.error('❌ Error fetching words:', err);
      res.status(500).json({ error: 'Failed to fetch words.' });
    }
  });
  
// ➕ Add a new word
app.post('/api/words', async (req, res) => {
  try {
    const { word, syllables, split, difficulty } = req.body;
    const newWord = new Word({ word, syllables, split, difficulty });
    await newWord.save();
    res.status(201).json({ message: '✅ Word added!', word: newWord });
  } catch (err) {
    console.error('Error adding word:', err);
    res.status(500).json({ error: 'Failed to add word' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('🎉 Syllable Tap Game API is running!');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});