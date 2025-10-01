import React, { useEffect, useState } from "react";
import { getScores } from "../services/flashcardService";
import "./Score.css"; // styling file

function Score() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    getScores()
      .then((data) => {
        console.log("📥 Scores from backend (in component):", data);
        setScores(data);
      })
      .catch((err) => console.error("❌ Error fetching scores:", err));
  }, []);

  return (
    <div className="score-page">
      <h2 className="score-title">📊 Your Scores</h2>
      {scores.length === 0 ? (
        <p className="no-score">No scores found.</p>
      ) : (
        <div className="score-list">
          {scores.map((s, idx) => (
            <div className="score-card" key={idx}>
              <p className="score-username">{s.username}</p>
              <p className="score-value">Score: {s.score}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Score;
