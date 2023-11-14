import React from "react";
import { useState } from "react";
const AddComment = ({ postId, setComments, userId, postID }) => {
  const [newComment, setNewComment] = useState("");
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Submitting comment...");
      const response = await fetch(
        `http://localhost:5000/comments/user/${userId}/post/${postID}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ content: newComment }),
        }
      );
      const data = await response.json();
      console.log("New comment created:", data);
      setComments((prevComments) => ({
        ...prevComments,
        [postId]: [...(prevComments[postId] || []), data],
      }));

      setNewComment("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleCommentSubmit} className="comment-form">
      <input
        type="text"
        placeholder="Add a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default AddComment;
