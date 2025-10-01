import React, { useState } from "react";
import { addFlashcard } from "../services/flashcardService";
import "./FlashcardForm.css";

function FlashcardForm({ onFlashcardAdded }) {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correct, setCorrect] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ remove empty options
    const cleanedOptions = options.filter((opt) => opt.trim() !== "");

    // ✅ construct card object
    const card = { question, options: cleanedOptions, answer: correct };

    console.log("📤 Sending to backend:", card);

    try {
      const res = await addFlashcard(card);
      console.log("✅ Response from backend:", res);

      setMessage("✅ Flashcard added successfully!");

      // reset form
      setQuestion("");
      setOptions(["", "", "", ""]);
      setCorrect("");

      if (onFlashcardAdded) onFlashcardAdded(card);
    } catch (err) {
      console.error("❌ Error adding flashcard:", err);
      setMessage("❌ Failed to add flashcard");
    }
  };

  return (
    <div className="form-container">
      <h2>➕ Add New Flashcard</h2>
      <form onSubmit={handleSubmit} className="flashcard-form">
        {/* Question */}
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Enter question"
          required
        />

        {/* Options */}
        {options.map((opt, i) => (
          <input
            key={i}
            type="text"
            value={opt}
            onChange={(e) => {
              const newOpts = [...options];
              newOpts[i] = e.target.value;
              setOptions(newOpts);
            }}
            placeholder={`Option ${i + 1}`}
            required
          />
        ))}

        {/* Correct Answer */}
        <select
          value={correct}
          onChange={(e) => setCorrect(e.target.value)}
          required
        >
          <option value="">Select correct answer</option>
          {options.map(
            (opt, i) =>
              opt.trim() !== "" && (
                <option key={i} value={opt}>
                  {opt}
                </option>
              )
          )}
        </select>

        <button type="submit">Add Flashcard</button>
      </form>

      {message && (
        <p
          className={
            message.includes("✅") ? "success-message" : "error-message"
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default FlashcardForm;
