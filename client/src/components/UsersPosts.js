import React, { useEffect, useState } from "react";

const UsersPosts = ({ userId }) => {
  const [userPosts, setUserPosts] = useState([]);
  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/post/${userId}`);
        const data = await response.json();
        console.log("User posts data:", data);
        setUserPosts(data);
        setUserPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserPosts();
  }, [userId]);

  return (
    <div>
      <h2>User Posts</h2>
      <ul>
        {userPosts.map((post) => (
          <div key={post.id}>
            <p>Caption: {post.caption}</p>
            {post.image && <img src={post.image} alt={`Post ${post.id}`} />}
          </div>
        ))}
      </ul>
    </div>
  );
};

export default UsersPosts;
