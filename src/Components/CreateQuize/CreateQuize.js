import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import styles from "./CreateQuize.module.css";

import { DataContext } from "../../App"; // Importujemy kontekst z App

function CreateQuize() {
  const { handleDataFromChild } = useContext(DataContext); // Pobieramy funkcję z kontekstu
  const navigate = useNavigate();

  // stany(tablica stanów z inpótami)
  const [inputs, setInputs] = useState([{ pojecie: "", definicja: "" }]);

  // stan dla tematu
  const [topic, setTopic] = useState();

  const handleAddInput = () => {
    setInputs([...inputs, { pojecie: "", definicja: "" }]);
  };
  const handleInputChange = (index, field, value) => {
    const newInputs = [...inputs];
    newInputs[index][field] = value;
    setInputs(newInputs);
  };
  const newTopic = {
    topic: topic,
    items: inputs, // Przypisanie tablicy `inputs` do klucza `items`
  };

  //wysyłąmy przyciskiem dane
  const sendData = () => {
    navigate("/");
    //  const data = { newTopic }; // Dane do przesłania
    handleDataFromChild(newTopic); // Wywołujemy funkcję z kontekstu
  };

  return (
    <>
      <div className={styles.topicInput}>
        <h3>Stwórz nowy zestaw fiszek</h3>
        <input
          type="text"
          className={styles.input}
          placeholder="Tytuł"
          onChange={(e) => setTopic(e.target.value)}
        />
      </div>

      {inputs.map((input, index) => (
        <div key={index} className={styles.inputs_together}>
          {/* kolumna inputów 1 */}
          <input
            className={styles.input}
            id={`pojecie-${index}`}
            type="text"
            placeholder="pojecie"
            onChange={(e) =>
              handleInputChange(index, "pojecie", e.target.value)
            }
          />

          {/* kolumna inputów 2 */}
          <input
            className={styles.input}
            id={`pojecie-${index}`}
            type="text"
            placeholder="definicja"
            onChange={(e) =>
              handleInputChange(index, "definicja", e.target.value)
            }
          />
        </div>
      ))}

      <div className="add_input">
        <button onClick={handleAddInput}>Dodaj fiszkę</button>
      </div>
      <div className={styles.add_input} onClick={sendData}>
        <p className={styles.block_text}>Dodaj fiszkę</p>
      </div>
    </>
  );
}

export default CreateQuize;
