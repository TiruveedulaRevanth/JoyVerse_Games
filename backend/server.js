require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    dbName: 'JoyVerse_data',
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('✅ Connected to MongoDB JoyVerse_data'))
.catch((err) => console.error('❌ MongoDB connection error:', err));

// Define the Score schema and model
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
});


const Score = mongoose.model('Score', scoreSchema);

// ➕ Save a score
app.post('/api/scores', async (req, res) => {
  try {
    const { score, difficulty } = req.body;
    const newScore = new Score({ score, difficulty });
    await newScore.save();
    res.status(201).json({ message: '✅ Score saved!', score: newScore });
  } catch (err) {
    console.error('Error saving score:', err);
    res.status(500).json({ error: 'Failed to save score' });
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
