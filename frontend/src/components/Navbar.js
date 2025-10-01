import React from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  return (
    <nav className="navbar">
      {/* Left Logo */}
      <div className="navbar-left">
        <h1 className="logo">Flashcard Study</h1>
      </div>

      {/* Right Links */}
      <div className="navbar-right">
        {/* ✅ Home sab ke liye */}
        <NavLink className="nav-link" to="/" end>
          Home
        </NavLink>

        {/* ✅ User Navbar */}
        {user?.role === "user" && (
          <>
            <NavLink className="nav-link" to="/quiz">
              Play Quiz
            </NavLink>
            <NavLink className="nav-link" to="/scores">
              View Scores
            </NavLink>
          </>
        )}

        {/* ✅ Admin Navbar */}
        {user?.role === "admin" && (
          <>
            <NavLink className="nav-link" to="/viewall">
              View All
            </NavLink>
            <NavLink className="nav-link" to="/admin">
              Admin Dashboard
            </NavLink>
          </>
        )}

        {/* ✅ User Info + Logout */}
        {user && (
          <div className="user-info">
            <span className="welcome">Hi, {user.username}</span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
