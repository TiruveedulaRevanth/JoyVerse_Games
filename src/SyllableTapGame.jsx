import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SyllableTapGame.css';

export default function SyllableTapGame() {
  const [difficulty, setDifficulty] = useState('easy');
  const [wordPool, setWordPool] = useState([]);
  const [usedWords, setUsedWords] = useState([]);
  const [currentWord, setCurrentWord] = useState(null);
  const [taps, setTaps] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [gameComplete, setGameComplete] = useState(false);

  const pickNewWord = (availableWords, used) => {
    const unusedWords = availableWords.filter(
      (w) => !used.some((usedWord) => usedWord.word === w.word)
    );

    if (unusedWords.length === 0) {
      setCurrentWord(null);
      setGameComplete(true);
      return;
    }

    const random = unusedWords[Math.floor(Math.random() * unusedWords.length)];
    setCurrentWord(random);
    setUsedWords([...used, random]);
    setTaps(0);
    setFeedback('');

  };

  const fetchWords = async (level) => {
    try {
      const res = await axios.get(`http://localhost:5000/api/words/${level}`);
      console.log('🔥 API response:', res.data);
      res.data.forEach(word => console.log("➡️", word.word));
      setUsedWords([]);
      setWordPool(res.data);
      setGameComplete(false);
      pickNewWord(res.data, []);
    } catch (error) {
      console.error('Error fetching words:', error);
    }
  };

  const handleTap = () => {
    if (feedback) return;
    setTaps((prev) => prev + 1);
  };

  const handleSubmit = () => {
    if (!currentWord) return;

    if (taps === currentWord.syllables) {
      setFeedback('✅ Great job!');
    } else {
      setFeedback(`❌ Oops! It has ${currentWord.syllables} syllables.`);
    }
  };

  const nextWord = () => {
    pickNewWord(wordPool, usedWords);
  };

  const repeatGame = () => {
    fetchWords(difficulty); // ✅ Now fetchWords is accessible
  };

  const handleDifficultyChange = (e) => {
    const level = e.target.value;
    setDifficulty(level);
  };

  useEffect(() => {
    fetchWords(difficulty);
  }, [difficulty]);

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
          <button onClick={repeatGame} className="repeat-button">🔁 Repeat All Words</button>
        </div>
      ) : (
        <p className="loading-text">Loading...</p>
      )}
    </div>
  );
}
