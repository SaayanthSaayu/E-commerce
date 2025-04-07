// Login.jsx

import React, { useState } from "react";
import { loginUser } from "../../api";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { role, username, userId } = await loginUser({ email, password });
      console.log("Role is , ", role);
      console.log("UserID is , ", userId);
      localStorage.setItem("username", username);
      localStorage.setItem("user", JSON.stringify({ userId: userId }));
      localStorage.setItem("role", role);
      console.log(
        "Login: localStorage user string:",
        localStorage.getItem("user")
      );

      if (role === "user") {
        navigate("/");
      } else if (role === "client") {
        navigate("/client-panel");
      } else if (role === "admin") {
        navigate("/admin-panel");
      }
    } catch (er) {
      setError(er.message || "Login failed");
      console.error("Login Error:", er);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        {error && <p className="login-error">{error}</p>}
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Login</button>
      </form>
      <p className="login-signup">
        Don't have an account? Create <Link to="/user-register">Now</Link>
      </p>
    </div>
  );
};

export default Login;
