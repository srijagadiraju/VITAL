import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields to log in.");
    } else {
      setShowSuccess(true);
      setTimeout(() => {
        navigate("/portal");
      }, 2000);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleLogin}>
          Log In
        </button>
        <button type="button" onClick={handleSignUp}>
          New User? Sign Up Here
        </button>
      </form>

      {showSuccess && (
        <div className="success-popup">
          <p>You have successfully logged in!</p>
        </div>
      )}
    </div>
  );
};

export default Join;
