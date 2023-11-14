import React, { useEffect, useState } from "react";

import AddPost from "./AddPost";
import { jwtDecode } from "jwt-decode";
import AllPostList from "./AllPostList";

const Home = () => {
  const token = localStorage.getItem("jwtToken");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.user.id;

  const [allPosts, setAllPosts] = useState([]);

  useEffect(() => {
    const fetchAllPosts = async () => {
      try {
        const response = await fetch("https://localhost:5000/post/all");
        if (response.ok) {
          const post = await response.json();
          setAllPosts(post);
        } else {
          console.error("Error fetching user posts", response.status);
        }
      } catch (error) {
        console.error("Error fetching all posts", error);
      }
    };
    fetchAllPosts();
  }, []);
  return (
    <div className="container">
      <AddPost userId={userId} />
      <h1>All posts</h1>
      <AllPostList allPosts={allPosts} setAllPosts={setAllPosts} />
    </div>
  );
};

export default Home;
