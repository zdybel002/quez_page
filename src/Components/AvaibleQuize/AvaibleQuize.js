import styles from "./AvaibleQuize.module.css";

import { useContext } from "react";
import { DataContext } from "../../App"; // Importujemy kontekst z App
import { Link } from "react-router-dom"; // Importujemy Link z React Router

function AvaibleQuize(props) {
  const { hadleDataFromNewQuize } = useContext(DataContext); // Pobieramy funkcję z kontekstu

  const handleClick = (item) => {
    props.onChoosenTopic(item);
  };
  const notDoneTopics = props.baza.filter((topic) => topic.isDone === false);

  return (
    <div className={styles.topics_blocks}>
      {notDoneTopics.map((item, index) => (
        <Link
          to={`/quize/${item.topic}`}
          key={index}
          className={styles.blocks_item}
          onClick={() => handleClick(item.topic)}
        >
          {item.topic}
        </Link>
      ))}
    </div>
  );
}

export default AvaibleQuize;
