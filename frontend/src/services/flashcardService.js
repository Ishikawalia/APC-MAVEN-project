// ===============================
// FLASHCARDS API
// ===============================

// ✅ Fetch all flashcards
export const getFlashcards = async () => {
  const response = await fetch("http://localhost:8080/api/flashcards");
  if (!response.ok) {
    throw new Error("Failed to fetch flashcards");
  }
  return response.json();
};

// ✅ Fetch random quiz (max 5 questions from backend)
export const getQuiz = async () => {
  const response = await fetch("http://localhost:8080/api/flashcards/quiz");
  if (!response.ok) {
    throw new Error("Failed to fetch quiz questions");
  }
  return response.json();
};

// ✅ Add a new flashcard
export const addFlashcard = async (flashcard) => {
  const response = await fetch("http://localhost:8080/api/flashcards", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flashcard),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("❌ Backend error:", errorText);
    throw new Error("Failed to add flashcard");
  }

  return response.json();
};

// ✅ Get a single flashcard by ID
export const getFlashcardById = async (id) => {
  const response = await fetch(`http://localhost:8080/api/flashcards/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch flashcard");
  }
  return response.json();
};

// ✅ Update flashcard
export const updateFlashcard = async (id, flashcard) => {
  const response = await fetch(`http://localhost:8080/api/flashcards/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(flashcard),
  });

  if (!response.ok) {
    throw new Error("Failed to update flashcard");
  }

  return response.json();
};

// ✅ Delete flashcard
export const deleteFlashcard = async (id) => {
  const response = await fetch(`http://localhost:8080/api/flashcards/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete flashcard");
  }
};

// ===============================
// ✅ Get all scores
export const getScores = async () => {
  const response = await fetch("http://localhost:8080/api/scores");
  if (!response.ok) {
    throw new Error("Failed to fetch scores");
  }
  const data = await response.json();
  console.log("📥 Scores from backend:", data); // debug
  return data;
};

// ✅ Save score
export const saveScore = async ({ userId, score }) => {
  console.log("📤 Sending score to backend:", { userId, score });

  const response = await fetch("http://localhost:8080/api/scores", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, score }), // backend expects this
  });

  if (!response.ok) {
    throw new Error("Failed to save score");
  }

  const data = await response.json();
  console.log("✅ Saved score response:", data);
  return data;
};
