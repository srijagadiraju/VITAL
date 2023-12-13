import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { state } = location;
    if (state && state.email) {
      setEmail(state.email);
    }
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email.trim() === "" ||
      username.trim() === "" ||
      password.trim() === ""
    ) {
      alert("Please fill in all fields to register.");
      return;
    }

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username, password }),
      });

      const data = await response.json();
      console.log("user created", data);

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate("/join");
        }, 2000);
      } else {
        alert(data.msg);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("An error occurred during registration.");
    }
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   // check if all fields are filled
  //   if (
  //     email.trim() === "" ||
  //     username.trim() === "" ||
  //     password.trim() === ""
  //   ) {
  //     alert("Please fill in all fields to register.");
  //   } else {
  //     // simulate registration process
  //     setTimeout(() => {
  //       setShowSuccess(true);

  //       // navigate to the join page after success
  //       setTimeout(() => {
  //         navigate("/join");
  //       }, 2000);
  //     }, 2000);
  //   }
  // };

  return (
    <div className="container">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button type="submit">Sign Up</button>
      </form>

      {showSuccess && (
        <div className="success-popup">
          <p>You have registered successfully!</p>
        </div>
      )}
    </div>
  );
};

export default Register;
