import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

// Znajdź element w DOM
const rootElement = document.getElementById("root");

// Stwórz "root" i wyrenderuj aplikację
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
