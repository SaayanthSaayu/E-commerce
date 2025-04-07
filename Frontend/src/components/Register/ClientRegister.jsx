

import React, { useState } from "react";
import { registerUser } from "../../api";
import { Link } from "react-router-dom";
import "./ClientRegister.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("client");

  if (role === "") {
    setRole("client");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser({ email, password, username, role });
      alert("Registration successful");
      console.log("User registered successfully");
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <div className="client-register-container">
      <form onSubmit={handleSubmit} className="client-register-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>

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

        <button type="submit">Submit</button>
      </form>

      <Link to="/">
        <button>Go to home</button>
      </Link>
    </div>
  );
};

export default Register;
