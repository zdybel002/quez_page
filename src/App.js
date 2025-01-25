import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { createContext } from "react";

import AvaibleQuize from "./Components/AvaibleQuize/AvaibleQuize";
import NewQuize from "./Components/Quize/NewQuize";
import CreateQuize from "./Components/CreateQuize/CreateQuize";
import { initianal_object } from "./initianal_object";
import styles from "./App.module.css";

export const DataContext = createContext();

function App() {
  const [userData, setUserData] = useState(initianal_object);
  const [shooseQuize, setChooseQuize] = useState();

  // Funkcja do obsługi danych z komponentu dziecka
  const handleDataFromChild = (data) => {
    setUserData((prewState) => {
      const newState = [...prewState, data]; // Obliczamy nowy stan
      console.log("Nowy stan:", newState); // Logujemy nowy stan
      return newState; // Ustawiamy nowy stan
    });
  };

  const hadleDataFromChoosenTopic = (data) => {
    console.log("shoose", data);
    setChooseQuize(data);
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
                  Historia
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
              <Route path="/history" element={<div>Historia</div>} />
              <Route
                path="/quize/:topic"
                element={
                  <NewQuize
                    chooseTopic={shooseQuize}
                    initianal_object={userData}
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

// import React, { useState } from "react";

// const DodajInputy = () => {

//   const [inputs, setInputs] = useState([{ pojecie: "", definicja: "" }]);

//   const handleAddInput = () => {
//     setInputs([...inputs, { pojecie: "", definicja: "" }]);
//     // Dodaje nowy obiekt inputów do stanu
//   };

//   const handleInputChange = (index, field, value) => {
//     const newInputs = [...inputs];
//     newInputs[index][field] = value;
//     setInputs(newInputs);
//   };

//   return (
//     <div>
//       <h3>Nazwa tematu</h3>
//       {inputs.map((input, index) => (
//         <div key={index} className="inputs_together">

//           <div className="kolumna_input">

//             <input
//               id={`pojecie-${index}`}
//               type="text"
//               value={input.pojecie}
//               onChange={(e) =>
//                 handleInputChange(index, "pojecie", e.target.value)
//               }
//             />
//             <label htmlFor={`pojecie-${index}`}>Pojęcie</label>
//           </div>
//           <div className="kolumna_input">
//             <input
//               id={`definicja-${index}`}
//               type="text"
//               value={input.definicja}
//               onChange={(e) =>
//                 handleInputChange(index, "definicja", e.target.value)
//               }
//             />
//             <label htmlFor={`definicja-${index}`}>Definicja</label>
//           </div>
//         </div>
//       ))}
//       <div className="add_input">
//         <button onClick={handleAddInput}>Dodaj fiszkę</button>
//       </div>
//     </div>
//   );
// };

// export default DodajInputy;
