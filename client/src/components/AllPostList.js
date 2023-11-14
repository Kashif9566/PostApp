import React from "react";

const AllPostList = ({ allPosts, setAllPosts }) => {
  return (
    <div>
      <h2>All Post</h2>
      <div className="post-container">
        {allPosts.map((post) => (
          <div className="post-card" key={post.id}>
            <button
              type="button"
              className="btn-close"
              style={{
                marginLeft: "26rem",
              }}
              //  onClick={() => handleDelete(post.id)}
            ></button>
            <h4>{post.users.username}</h4>
            <p>{post.caption}</p>
            <img
              src={`http://localhost:5000/${post.image}`}
              alt="Post"
              className="post-image"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPostList;
