import React, { useEffect, useState } from "react";
import Quiz from "../Quize/Quize";
import { generateQuizQuestions } from "../Untils/QuizeUntils";
function NewQuize(props) {
  const [isFinish, setIsFinish] = useState(false);

  const historiaItems = props.initianal_object
    .filter((item) => item.topic === props.chooseTopic) // Filtrujemy na podstawie tematu
    .flatMap((item) => item.items) // Spłaszczamy items
    .map((item) => ({
      pojecie: item.pojecie,
      definicja: item.definicja,
    })); // Zwracamy tylko pojecie i definicje

  // jesli dodtane jakis sygnal zminima stan na true
  // jesli true robie funkcje ktura wysyła do app topic ukonczonego tematu
  useEffect(() => {
    if (isFinish) {
      props.onFinishTopic(props.chooseTopic);
    }
  }, [isFinish, props.chooseTopic, props.onFinishTopic]);

  const handleFinishQuize = () => {
    setIsFinish();
  };
  const quizQuestions = generateQuizQuestions(historiaItems);
  return (
    <>
      {/* {console.log(quizQuestions)} */}
      <h4>{props.chooseTopic}</h4>
      <Quiz
        questions={quizQuestions}
        onFinishTopic={props.onFinishTopic}
        chooseTopic={props.chooseTopic}
        onFinishQuize={handleFinishQuize}
      />
    </>
  );
}

export default NewQuize;
