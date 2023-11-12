import React, { useEffect, useState } from "react";
import PostCard from "./PostCard";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fecthData = async () => {
      try {
        const response = await fetch("http://localhost:5000/post/all");
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fecthData();
  }, []);
  return (
    <div className="container">
      <PostCard posts={posts} setPosts={setPosts} />
    </div>
  );
};

export default Home;
