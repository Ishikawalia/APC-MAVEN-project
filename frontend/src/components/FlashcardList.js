import React, { useState, useEffect } from "react";
import { getFlashcards, deleteFlashcard } from "../services/flashcardService";
import "./FlashcardListPage.css";

function FlashcardListPage() {
  const [cards, setCards] = useState([]);

  const loadFlashcards = () => {
    const data = getFlashcards();
    setCards(data);
  };

  useEffect(() => {
    loadFlashcards();
  }, []);

  const handleDelete = (id) => {
    deleteFlashcard(id);
    loadFlashcards();
  };

  return (
    <div className="all-cards-container">
      <h2 className="all-cards-title">📖 All Flashcards</h2>

      {cards.length === 0 ? (
        <p className="no-cards">No flashcards available.</p>
      ) : (
        <table className="all-cards-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Correct Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cards.map((c) => (
              <tr key={c.id}>
                <td className="question-cell">{c.question}</td>
                <td>
                  <div className="options-list">
                    {Array.isArray(c.options) &&
                      c.options.map((o, i) => (
                        <span
                          key={i}
                          className={`option-chip ${
                            o === c.answer ? "correct" : ""
                          }`}
                        >
                          {o}
                        </span>
                      ))}
                  </div>
                </td>
                <td>
                  <span className="correct-chip">{c.answer}</span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(c.id)}
                    className="delete-btn"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default FlashcardListPage;
