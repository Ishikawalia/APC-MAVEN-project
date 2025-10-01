const BASE_URL = "http://localhost:8080/api/auth";

// 🔹 Signup
export async function signup(user) {
  const res = await fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}

// 🔹 Login
export async function login(user) {
  const res = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  });
  if (!res.ok) throw new Error("Login failed");

  const data = await res.json();

  // ✅ user data save to localStorage
  localStorage.setItem("user", JSON.stringify(data));

  return data;
}
