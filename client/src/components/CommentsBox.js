import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

import "./comments.css";

const CommentsBox = ({ comments, setComments }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };
  const handleDeleteComment = async (commentId) => {
    const response = await fetch(`http://localhost:5000/post/${commentId}`, {
      method: "DELETE",
    });
    if (response.ok) {
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    }
  };

  return (
    <div>
      <button onClick={toggleVisibility}>
        {isVisible ? "Hide Comments" : "Show Comments"}
      </button>

      {isVisible && (
        <div className="comments-section">
          {comments.map((comment) => (
            <div key={comment.id}>
              {comment.content}
              <button
                className="delete-comment-btn"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CommentsBox;
