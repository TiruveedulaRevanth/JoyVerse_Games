import React, { useState } from "react";
import "./Quiz.css";

const questions = [
  { question: "What is the capital of France?", options: ["Paris", "London", "Berlin", "Madrid"], answer: "Paris" },
  { question: "What is 2 + 2?", options: ["3", "4", "5", "6"], answer: "4" },
  { question: "Which planet is known as the Red Planet?", options: ["Earth", "Mars", "Jupiter", "Venus"], answer: "Mars" },
  { question: "What is the largest ocean on Earth?", options: ["Atlantic", "Indian", "Arctic", "Pacific"], answer: "Pacific" },
  { question: "Which animal is known as the King of the Jungle?", options: ["Elephant", "Tiger", "Lion", "Cheetah"], answer: "Lion" },
];

function QuizApp() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isWrong, setIsWrong] = useState(false);

  const handleAnswerClick = (option) => {
    const isCorrect = option === questions[currentQuestion].answer;
    setSelectedAnswer(option);
    setIsWrong(!isCorrect);

    if (isCorrect) setScore((prev) => prev + 1);

    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion((prev) => prev + 1);
        setSelectedAnswer(null);
        setIsWrong(false);
      } else {
        setShowScore(true);
      }
    }, 2000);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">🎉 Your Score: {score} / {questions.length} 🎉</div>
      ) : (
        <div>
          <h2>Quiz Game</h2>
          <div className="question-box">{questions[currentQuestion].question}</div>
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(option)}
              className={
                selectedAnswer
                  ? option === questions[currentQuestion].answer
                    ? "correct"
                    : option === selectedAnswer
                    ? "wrong-selected"
                    : ""
                  : ""
              }
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
          {selectedAnswer && (
            <p className="answer-feedback">
              {selectedAnswer === questions[currentQuestion].answer
                ? "✅ Correct!"
                : `❌ Wrong! The correct answer is: ${questions[currentQuestion].answer}`}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default QuizApp;
