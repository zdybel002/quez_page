import React, { useState } from "react";
import Quiz from "../Quize/Quize";
import { generateQuizQuestions } from "../Untils/QuizeUntils";
function NewQuize(props) {
  // const [question, setQuestion] = useState(props.)

  const historiaItems = props.initianal_object
    .filter((item) => item.topic === props.chooseTopic) // Filtrujemy na podstawie tematu
    .flatMap((item) => item.items) // Spłaszczamy items
    .map((item) => ({
      pojecie: item.pojecie,
      definicja: item.definicja,
    })); // Zwracamy tylko pojecie i definicje

  const quizQuestions = generateQuizQuestions(historiaItems);
  return (
    <>
      {console.log("NewQuize", props.chooseTopic)}
      <h4>{props.chooseTopic}</h4>
      <Quiz questions={quizQuestions} />
    </>
  );
}

export default NewQuize;
