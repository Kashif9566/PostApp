import React, { useState } from "react";
import AddUser from "./AddUser";
import { useNavigate } from "react-router-dom";
const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        const token = data.token;
        localStorage.setItem("jwtToken", token);
        setIsLoggedIn(true);
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleSignup = () => {
    setShowSignup(!showSignup);
  };

  return (
    <div className="form-container">
      <form className="form">
        <div className="form-group">
          <h2>Login</h2>
          <label>Username:</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label>Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="submit-button" type="button" onClick={handleLogin}>
          Login
        </button>
        <button className="submit-button" type="button" onClick={toggleSignup}>
          {showSignup ? "Cancel" : "Signup"}
        </button>
      </form>
      {showSignup && <AddUser />}
    </div>
  );
};

export default Login;
