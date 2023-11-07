import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // const handleSignUp = async (e) => {
    //     e.preventDefault();

    //     const userData = {
    //         email,
    //         username,
    //         password,
    //     };

    //     try {
    //         const response = await fetch("/registration/register", {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(userData)
    //         });

    //         if (response.ok) {
    //             console.log('User registered successfully!');
    //             navigate('/join'); // Redirect to the login page
    //         } else {
    //             console.error('Failed to register user.');
    //         }
    //     } catch (error) {
    //         console.error('Error registering user:', error);
    //     }
    // };

  return (
    <div>
      <h1>Register</h1>
      <form>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
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
        <button type="button" onClick={() => navigate('/join')}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Register;
