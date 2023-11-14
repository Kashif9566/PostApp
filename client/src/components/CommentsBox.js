import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const CommentsBox = ({ comments, setComments, userId, postId }) => {
  const handleDeleteComment = async (commentId) => {
    const response = await fetch(
      `http://localhost:5000/comments/user/${userId}/post/${postId}/comment/${commentId}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const deletedComment = comments.filter(
        (comment) => comment.id !== commentId
      );
      setComments(deletedComment);
    }
  };

  return (
    <div>
      <div className="comments-section">
        {comments.map((comment) => (
          <div key={comment.id}>
            <b>{comment.users.username}</b>:{comment.content}
            <button
              className="delete-comment-btn"
              onClick={() => handleDeleteComment(comment.id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsBox;
