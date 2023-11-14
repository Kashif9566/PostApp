import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import UserPostsList from "./UserPostsList";

const UserProfile = () => {
  const [userId, setUserId] = useState(null);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user.id;
      setUserId(userId);
      fetchUserPost(userId);
    }
  }, []);

  const fetchUserPost = async (userId) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${userId}`);
      if (response.ok) {
        const post = await response.json();
        setUserPosts(post);
      } else {
        console.error("Error fetching user posts", response.status);
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>User Id: {userId}</p>
      <UserPostsList
        userPosts={userPosts}
        userId={userId}
        setUserPosts={setUserPosts}
      />
    </div>
  );
};

export default UserProfile;
