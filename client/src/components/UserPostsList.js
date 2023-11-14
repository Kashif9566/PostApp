import React, { useState } from "react";
import AddComment from "./AddComment";
import CommentsBox from "./CommentsBox";
const UserPostsList = ({ userPosts, userId, setUserPosts }) => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [comments, setComments] = useState({});

  const handleDelete = async (postId) => {
    try {
      await fetch(`http://localhost:5000/post/${userId}/${postId}`, {
        method: "DELETE",
      });
    } catch (error) {
      console.log(error);
    }
    const updatedPosts = userPosts.filter((post) => post.id !== postId);
    setUserPosts(updatedPosts);
  };

  const handleLike = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/likes/user/${userId}/post/${postId}`,
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
  const handleComments = async (postId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/comments/user/${userId}/post/${postId}`
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

  return (
    <div>
      <h2>User Post</h2>
      <div className="post-container">
        {userPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <button
              type="button"
              className="btn-close"
              style={{
                marginLeft: "26rem",
              }}
              onClick={() => handleDelete(post.id)}
            ></button>
            <h3>{post.users.username}</h3>
            <hr />
            <p>{post.caption}</p>
            <hr />
            <img
              src={`http://localhost:5000/${post.image}`}
              alt="Post"
              className="post-image"
            />
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
            {comments[post.id] && (
              <>
                <CommentsBox
                  comments={comments[post.id]}
                  setComments={setComments}
                  userId={userId}
                  postId={post.id}
                />
                <AddComment
                  postId={post.id}
                  setComments={setComments}
                  userId={userId}
                  postID={post.id}
                />
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPostsList;
