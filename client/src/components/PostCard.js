import React from "react";
import { useState } from "react";
const PostCard = ({ posts, setPosts }) => {
  const [comments, setComments] = useState({});
  const [likedPosts, setLikedPosts] = useState([]);

  const handleComments = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/comment/post/${postId}`
      );
      const data = await response.json();
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: data,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/post/${postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setComments((prevComments) => {
      const { [postId]: deletedPostComments, ...rest } = prevComments;
      return rest;
    });
  };
  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/like/post/${postId}`,
        {
          method: "POST",
        }
      );
      const updatedPost = await response.json();
      console.log("Response from server:", updatedPost);

      setLikedPosts((prevLikedPosts) => [...prevLikedPosts, updatedPost.id]);
    } catch (error) {
      console.error("Error during like:", error);
    }
  };

  return (
    <div className="post-container">
      {posts.map((post) => (
        <div className="post-card" key={post.id}>
          <h4>{post.user?.[0]?.username}</h4>
          <button
            type="button"
            className="btn-close"
            style={{
              marginLeft: "26rem",
            }}
            onClick={() => handleDelete(post.id)}
          ></button>
          <div className="caption">{post.caption}</div>
          <hr />
          {post.image && <img src={post.image} alt={`Post ${post.id}`} />}
          <button
            className={`btn btn-primary btn-block mx-auto d-block ${
              likedPosts.includes(post.id) ? "btn-success" : "btn-transparent"
            }`}
            style={{ borderRadius: "20px", marginTop: "10px" }}
            onClick={() => handleLike(post.id)}
          >
            {likedPosts.includes(post.id) ? "Liked" : "Like"}
          </button>
          <button
            className="btn btn-primary btn-block mx-auto d-block"
            style={{ borderRadius: "20px", marginTop: "10px" }}
            onClick={() => handleComments(post.id)}
          >
            Comment
          </button>
        </div>
      ))}
    </div>
  );
};

export default PostCard;
