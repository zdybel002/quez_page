import React, { useEffect, useState } from "react";

const Quiz = (props) => {
  const handleQuizFinish = () => {
    props.onFinishQuize();
  };
  // Aktualne pytanie
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Wynik użytkownika
  const [score, setScore] = useState(0);

  // Czy quiz jest zakończony?
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Pobranie aktualnego pytania z props.questions
  const currentQuestion = props.questions[currentQuestionIndex];

  const handleAnswer = (selectedAnswer) => {
    if (selectedAnswer === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestionIndex + 1 < props.questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
    handleQuizFinish();
  };

  // Po zakończeniu quizu
  if (isQuizFinished) {
    props.onFinishTopic(props.chooseTopic);
    return (
      <div>
        <h2>Koniec quizu!</h2>
        <p>
          Twój wynik to {score}/{props.questions.length}
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
