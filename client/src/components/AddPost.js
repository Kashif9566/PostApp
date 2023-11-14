import React, { useState } from "react";
import "./addpost.css";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const AddPost = ({ userId }) => {
  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const Navigate = useNavigate();

  const handleCaptionChange = (e) => {
    setCaption(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("jwtToken");
    const decoded = jwtDecode(token);
    userId = decoded.user.id;
    console.log("Token:", token);
    console.log("UserId:", userId);

    if (!token) {
      console.error("User not authenticated");
      return;
    }

    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("image", image);

    try {
      const response = await fetch(`http://localhost:5000/post/${userId}`, {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Post created:", data);
        Navigate("/profile");
      } else {
        console.error("Error creating post:", response.status);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <h2>Create Post</h2>
          <label htmlFor="caption" className="label">
            Caption:
          </label>
          <input
            type="text"
            id="caption"
            name="caption"
            value={caption}
            onChange={handleCaptionChange}
            className="input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="image" className="label">
            Image:
          </label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
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

export default AddPost;
