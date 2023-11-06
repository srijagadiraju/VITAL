import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

const Join = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        console.log("Username:", username);
        console.log("Password:", password);

        navigate("/portal/1"); 
    };

    const handleSignUp = () => {
        navigate("/register"); // redirect to the '/register' page
    };

    return (
        <div>
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
                    Login
                </button>
                <button type="button" onClick={handleSignUp}>
                    New User? Sign Up Here
                </button>
            </form>
        </div>
    );
};

export default Join;
