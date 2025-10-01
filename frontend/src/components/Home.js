import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="home-container">
        <h1>Please login first</h1>
        <Link to="/login" className="btn primary">Go to Login</Link>
      </div>
    );
  }

  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to Flashcard Study</h1>

      {/* ✅ Agar user hai */}
      {user.role === "user" && (
        <>
          <p className="home-subtitle">
            Learn faster using flashcards — play quizzes and track your scores.
          </p>
          <div className="home-buttons">
            <Link to="/quiz" className="btn primary">▶ Play Quiz</Link>
            <Link to="/scores" className="btn secondary">📊 View Scores</Link>
          </div>
        </>
      )}

      {/* ✅ Agar admin hai */}
      {user.role === "admin" && (
        <>
          <p className="home-subtitle">
            Learn faster using flashcards — admin can add questions and view questions.
          </p>
          <div className="home-buttons">
            <Link to="/admin" className="btn primary">➕ Add Flashcards</Link>
            <Link to="/viewall" className="btn secondary">📖 View Flashcards</Link>
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
