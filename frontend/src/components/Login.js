import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";

function Login({ setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginData = { email, password };

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const user = await response.json();
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
          setUser(user);

          // ✅ role ke hisaab se redirect
          if (user.role === "admin") {
            navigate("/admin");
          } else {
            navigate("/");
          }
        } else {
          alert("Invalid email or password!");
        }
      } else {
        alert("Login failed. Try again!");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Error: Could not connect to server");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="btn primary">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account? <Link to="/signup">Signup</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
