import React, { useState } from "react";
import styles from "./Quize.module.css";

const Quiz = ({ questions }) => {
  // Aktualne pytanie
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Wynik użytkownika
  const [score, setScore] = useState(0);

  // Czy quiz jest zakończony?
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Aktualne pytanie
  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  if (isQuizFinished) {
    return (
      <div>
        <h2>Koniec quizu!</h2>
        <p>
          Twój wynik to {score}/{questions.length}
        </p>
      </div>
    );
  }

  return (
    <div>
      <h2>{currentQuestion.question}</h2>
      {currentQuestion.options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleAnswer(option)}
          style={{
            margin: "10px",
            padding: "10px 20px",
            cursor: "pointer",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Quiz;
