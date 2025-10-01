import React, { useEffect, useState } from "react";
import FlashcardForm from "./FlashcardForm";
import { getFlashcards, addFlashcard } from "../services/flashcardService";
import "./AdminDashboard.css";

function AdminDashboard() {
  const [cards, setCards] = useState([]);
  const [history, setHistory] = useState([]);

  // ✅ Load flashcards from backend
  useEffect(() => {
    loadCards();
  }, []);

  const loadCards = async () => {
    try {
      const data = await getFlashcards();
      setCards(data);
    } catch (err) {
      console.error("Error loading flashcards:", err);
    }
  };

  // ✅ Add new flashcard
  const onAdd = async (card) => {
    try {
      const prev = [...cards];
      await addFlashcard(card);
      setHistory((h) => [{ type: "add", prev }, ...h]);

      await loadCards(); // reload after add
    } catch (err) {
      console.error("Error adding flashcard:", err);
    }
  };

  // ✅ Undo last action
  const undo = () => {
    const last = history[0];
    if (!last) return alert("Nothing to undo");
    setCards(last.prev);
    setHistory((h) => h.slice(1));
    localStorage.setItem("fs_flashcards", JSON.stringify(last.prev));
  };

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <div className="sidebar">
        <h2>📚 Flashcards</h2>
        <a href="#dashboard">📊 Dashboard</a>
        <a href="#add">➕ Add Flashcard</a>
      </div>

      {/* Main Content */}
      <div className="admin-container">
        <div className="admin-header">
          <h2>⚙️ Admin Dashboard</h2>
          <button onClick={undo} className="undo-btn">
            Undo Last
          </button>
        </div>

        {/* Stats */}
        <div className="stats" id="dashboard">
          <div className="stat-card">
            <h3>Total Flashcards</h3>
            <p>{cards.length}</p>
          </div>
        </div>

        {/* Add Form */}
        <div className="form-card" id="add">
          <h3>➕ Add New Flashcard</h3>
          <FlashcardForm onFlashcardAdded={onAdd} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
