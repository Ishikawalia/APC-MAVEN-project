import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import FlashcardQuiz from "./components/FlashcardQuiz";
import Score from "./components/Score";
import AdminDashboard from "./components/AdminDashboard";
import FlashcardListPage from "./components/FlashcardListPage";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setUser(JSON.parse(saved));
  }, []);

  return (
    <Router>
      {user && <Navbar user={user} setUser={setUser} />}

      <Routes>
        {!user ? (
          <>
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="*" element={<Navigate to="/signup" />} />
          </>
        ) : (
          <>
            {/* ✅ Homepage */}
            <Route path="/" element={<Home />} />

            {/* ✅ User Routes (props correctly passed) */}
            <Route
              path="/quiz"
              element={<FlashcardQuiz userId={user.userId} username={user.username} />}
            />
            <Route path="/scores" element={<Score />} />

            {/* ✅ View All page */}
            <Route path="/viewall" element={<FlashcardListPage />} />

            {/* ✅ Admin Routes */}
            {user.role === "admin" && (
              <Route path="/admin" element={<AdminDashboard />} />
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </>
        )}
      </Routes>
    </Router>
  );
}

export default App;
