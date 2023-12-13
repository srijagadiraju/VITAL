import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./join.css";

const Join = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields to log in.");
      return;
    }

    try {
      const response = await fetch("/api/auth/login/password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        navigate("/portal");
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("An error occurred during login.");
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  return (
    <div className="container form-signin w-100 m-auto">
      <form onSubmit={handleSubmit}>
        <h1>Please Sign In</h1>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="username"
            name="username"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="password"
            name="password"
          />
        </div>
        <button type="submit">Log In</button>
        <button type="button" onClick={handleSignUp}>
          New User? Sign Up Here
        </button>
      </form>
    </div>
  );
};

export default Join;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./join.css";

// const Join = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [showSuccess, setShowSuccess] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = () => {
//     if (username.trim() === "" || password.trim() === "") {
//       alert("Please fill in all fields to log in.");
//     } else {
//       setShowSuccess(true);
//       setTimeout(() => {
//         navigate("/portal");
//       }, 2000);
//     }
//   };

//   const handleSignUp = () => {
//     navigate("/register");
//   };

//   return (
//     <div className="container form-signin w-100 m-auto">
//       <form action="/api/login/password" method="post">
//         <h1>Please Sign In</h1>
//         <div className="form-group">
//           <label htmlFor="username">Username</label>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="username"
//             name="username"
//           />
//         </div>
//         <div className="form-group">
//           <label htmlFor="password">Password</label>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="password"
//             name="password"
//           />
//         </div>
//         <button type="button" onClick={handleLogin}>
//           Log In
//         </button>
//         <button type="button" onClick={handleSignUp}>
//           New User? Sign Up Here
//         </button>
//       </form>

//       {showSuccess && (
//         <div className="success-popup">
//           <p>You have successfully logged in!</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Join;
