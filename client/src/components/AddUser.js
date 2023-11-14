import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { username, password };
      const response = await fetch("http://localhost:5000/user/register", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        Navigate("/login");
        setUserName("");
        setPassword("");
      } else {
        console.error("Failed to add user");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <h2>SignUp</h2>
          <label htmlFor="user" className="label">
            Username
          </label>
          <input
            type="text"
            id="user"
            name="user"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
            className="input"
          />
          <label>Password:</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
