import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const AddUser = () => {
  const [username, setUserName] = useState("");
  const Navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = { username };
      const response = await fetch("http://localhost:5000/user", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        Navigate("/adduser");
        setUserName("");
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
          <h2>Login</h2>
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
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AddUser;
