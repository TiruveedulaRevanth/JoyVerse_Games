import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App.jsx"; // Your Quiz App
import SyllableTapGame from "./SyllableTapGame.jsx";
import Dashboard from "./Dashboard.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/quiz" element={<App />} />
        <Route path="/syllable" element={<SyllableTapGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
