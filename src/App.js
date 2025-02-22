import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import React from "react";
import HomePage from "./pages/HomePage";
import StudyPage from "./pages/StudyPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/study" element={<StudyPage />} />
      </Routes>
    </Router>
  );
}
