

import React, { useState } from "react";
import { registerUser } from "../../api";
import { Link } from "react-router-dom";
import "./UserRegister.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ email, password, username });
      alert("Registration successful");
      console.log("User registered successfully");
    } catch (er) {
      console.error(er);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
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

      <div className="existing">
        <p>
          Existing user? <Link to="/login">Login</Link>
        </p>
      </div>

      <div className="client">
        <p>
          Are yo looking to collabrate with us ? Register <Link to="/client-register">Now</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
