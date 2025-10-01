import React, { useEffect, useState } from "react";
import { getQuiz, saveScore } from "../services/flashcardService";
import "./Quiz.css";

function FlashcardQuiz({ userId, username }) {
  const [quiz, setQuiz] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    console.log("🟢 Received props:", { userId, username }); // debug

    getQuiz()
      .then((data) => {
        setQuiz(data);
        setCurrentQ(0);
        setScore(0);
        setFinished(false);
      })
      .catch((err) => console.error("❌ Error fetching quiz:", err));
  }, [userId, username]);

  const handleAnswer = (option) => {
    setSelected(option);

    if (option === quiz[currentQ].answer) {
      setScore((prev) => prev + 1);
    }

    setTimeout(() => {
      if (currentQ + 1 < quiz.length) {
        setCurrentQ((prev) => prev + 1);
        setSelected(null);
      } else {
        const finalScore =
          score + (option === quiz[currentQ].answer ? 1 : 0);

        setScore(finalScore);
        setFinished(true);

        // ✅ Important Debug
        console.log("📤 Saving score to backend:", { userId, score: finalScore });

        saveScore({ userId, score: finalScore })
          .then((res) => console.log("✅ Score saved:", res))
          .catch((err) => console.error("❌ Failed to save score:", err));
      }
    }, 1500);
  };

  const handleRetake = () => {
    setCurrentQ(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (quiz.length === 0) return <p>Loading quiz...</p>;

  if (finished) {
    return (
      <div className="quiz-container">
        <div className="quiz-card">
          <h2>✅ Quiz Finished</h2>
          <p>
            {username}, your score is <b>{score}</b> / {quiz.length}
          </p>
          <button className="retake-btn" onClick={handleRetake}>
            🔄 Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const question = quiz[currentQ];

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h3>
          📝 Question {currentQ + 1} of {quiz.length}
        </h3>
        <h4>{question.question}</h4>

        <div className="options">
          {question.options.map((opt, i) => {
            let className = "option-btn";
            if (selected) {
              if (opt === question.answer) {
                className += " correct";
              } else if (opt === selected) {
                className += " wrong";
              }
            }
            return (
              <button
                key={i}
                className={className}
                disabled={!!selected}
                onClick={() => handleAnswer(opt)}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default FlashcardQuiz;
