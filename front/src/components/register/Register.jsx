import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css"; 

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignUp = () => {
        // Your logic to handle user sign-up goes here
        console.log("Email:", email);
        console.log("Username:", username);
        console.log("Password:", password);

        // Your logic to store user data in the database goes here
        // This can involve an API call or database operation to store user details

        // Redirect user back to the login page after successful sign-up
        navigate("/join"); // Redirect to the login page
    };

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
                <button type="button" onClick={handleSignUp}>
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default Register;
