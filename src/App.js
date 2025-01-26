import React, { use, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext } from "react";

import AvaibleQuize from "./Components/AvaibleQuize/AvaibleQuize";
import NewQuize from "./Components/Quize/NewQuize";
import CreateQuize from "./Components/CreateQuize/CreateQuize";
import { initianal_object } from "./initianal_object";
import styles from "./App.module.css";
import OldQuize from "./OldQuize/OldQuize";

export const DataContext = createContext();

function App() {
  const [userData, setUserData] = useState(initianal_object);
  const [shooseQuize, setChooseQuize] = useState();

  // Funkcja do obsługi danych z komponentu dziecka
  const handleDataFromChild = (data) => {
    setUserData((prewState) => {
      const newState = [...prewState, data]; // Obliczamy nowy stan
      return newState; // Ustawiamy nowy stan
    });
  };

  const hadleDataFromChoosenTopic = (data) => {
    // console.log("shoose", data);
    setChooseQuize(data);
  };

  const handleFinishTopic = (data) => {
    setUserData((prevState) => {
      // Modyfikujemy tylko te dane, które faktycznie się zmieniają
      const updatedData = prevState.map((item) => {
        if (item.topic === data && !item.isDone) {
          return { ...item, isDone: true }; // Zmieniamy tylko, jeśli isDone jest false
        }
        return item; // Zwracamy niezmieniony element, jeśli temat nie pasuje lub już jest done
      });

      // Sprawdzamy, czy stan się zmienił przed jego aktualizowaniem
      // Jeśli updatedData jest identyczna z prevState, to nie aktualizujemy stanu
      if (JSON.stringify(prevState) !== JSON.stringify(updatedData)) {
        console.log("Updated Data:", updatedData); // Zalogujmy stan przed zmianą
        return updatedData; // Zwracamy nowy stan tylko jeśli się zmienił
      } else {
        console.log("No change in state.");
        return prevState; // Zwracamy poprzedni stan, jeśli brak zmian
      }
    });
  };

  return (
    <div className={styles.main_container}>
      <Router>
        <DataContext.Provider value={{ userData, handleDataFromChild }}>
          <nav className={styles.main_nav}>
            <ul className={styles.main_nav_list}>
              <li className={styles.main_nav_item}>
                <Link className={styles.main_nav_link} to="/">
                  Dostępne quizy
                </Link>
              </li>
              <li className={styles.main_nav_item}>
                <Link className={styles.main_nav_link} to="/create">
                  Stwórz quiz
                </Link>
              </li>
              <li className={styles.main_nav_item}>
                <Link className={styles.main_nav_link} to="/history">
                  Wykonane quize
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <AvaibleQuize
                    baza={userData}
                    onChoosenTopic={hadleDataFromChoosenTopic}
                  />
                }
              />
              <Route path="/create" element={<CreateQuize />} />
              <Route
                path="/history"
                element={<OldQuize tableData={userData} />}
              />
              <Route
                path="/quize/:topic"
                element={
                  <NewQuize
                    chooseTopic={shooseQuize}
                    initianal_object={userData}
                    onFinishTopic={handleFinishTopic}
                  />
                }
              />
            </Routes>
          </div>
        </DataContext.Provider>
      </Router>
    </div>
  );
}

export default App;
