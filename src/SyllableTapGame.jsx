import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SyllableTapGame.css';

const hardcodedWords = {
  easy: [
    { word: 'cat', syllables: 1, split: ['cat'] },
    { word: 'apple', syllables: 2, split: ['ap', 'ple'] },
    { word: 'banana', syllables: 3, split: ['ba', 'na', 'na'] }
  ],
  medium: [
    { word: 'elephant', syllables: 3, split: ['el', 'e', 'phant'] },
    { word: 'computer', syllables: 3, split: ['com', 'pu', 'ter'] },
    { word: 'umbrella', syllables: 3, split: ['um', 'brel', 'la'] }
  ],
  hard: [
    { word: 'helicopter', syllables: 4, split: ['hel', 'i', 'cop', 'ter'] },
    { word: 'mathematics', syllables: 4, split: ['math', 'e', 'mat', 'ics'] },
    { word: 'encyclopedia', syllables: 6, split: ['en', 'cy', 'clo', 'pe', 'di', 'a'] }
  ]
};

export default function SyllableTapGame() {
  const [difficulty, setDifficulty] = useState('easy');
  const [wordPool, setWordPool] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [taps, setTaps] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);

  const pickNewWord = (availableWords, used) => {
    const unusedWords = availableWords.filter(
      (w) => !used.some((usedWord) => usedWord.word === w.word)
    );

    if (unusedWords.length === 0) {
      setCurrentWord(null);
      setGameComplete(true);
      submitScore();
      return;
    }

    const random = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    setCurrentWord(random);
    setUsedWords([...used, random]);
    setTaps(0);
    setFeedback('');
  };

  const submitScore = async () => {
    try {
      await axios.post('http://localhost:5000/api/scores', {
        score,
        difficulty
      });
      console.log('🎯 Score submitted successfully');
    } catch (err) {
      console.error('❌ Failed to submit score:', err);
    }
  };

  const startGame = (level) => {
    const words = hardcodedWords[level];
    setDifficulty(level);
    setUsedWords([]);
    setWordPool(words);
    setGameComplete(false);
    setScore(0);
    pickNewWord(words, []);
  };

  const handleTap = () => {
    if (feedback) return;
    setTaps((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (!currentWord) return;
    if (taps === currentWord.syllables) {
      setFeedback('✅ Great job!');
      setScore((prev) => prev + 1);
    } else {
      setFeedback(`❌ Oops! It has ${currentWord.syllables} syllables.`);
    }
  };

  const nextWord = () => {
    pickNewWord(wordPool, usedWords);
  };

  const repeatGame = () => {
    startGame(difficulty);
  };

  const handleDifficultyChange = (e) => {
    startGame(e.target.value);
  };

  useEffect(() => {
    startGame(difficulty);
  }, []);

  return (
    <div className="syllable-game">
      <h2>🥁 Syllable Tap Game</h2>

      <div className="difficulty-select">
        <label>Difficulty: </label>
        <select value={difficulty} onChange={handleDifficultyChange}>
          <option value="easy">Easy 🍎</option>
          <option value="medium">Medium 🐘</option>
          <option value="hard">Hard 🧠</option>
        </select>
      </div>

      {currentWord ? (
        <>
          <p className="word-display">{currentWord.word}</p>
          <p className="split-display">
            {currentWord.split.map((syllable, idx) => (
              <span key={idx} className="syllable">{syllable}</span>
            ))}
          </p>

          <button onClick={handleTap} className="tap-button">Tap</button>
          <p className="tap-count">Taps: {taps}</p>

          {!feedback && taps > 0 && (
            <button onClick={handleSubmit} className="submit-button">Submit</button>
          )}

          <p className={`feedback ${feedback.startsWith('✅') ? 'correct' : feedback.startsWith('❌') ? 'wrong' : ''}`}>
            {feedback}
          </p>

          {feedback && (
            <button onClick={nextWord} className="next-button">Next Word</button>
          )}
        </>
      ) : gameComplete ? (
        <div className="game-over">
          <p>🎉 You completed all words in <strong>{difficulty}</strong> mode!</p>
          <p>⭐ Your score: {score}/{wordPool.length}</p>
          <button onClick={repeatGame} className="repeat-button">🔁 Repeat All Words</button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}
