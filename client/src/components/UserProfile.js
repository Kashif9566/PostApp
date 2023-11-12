import React, { useEffect, useState } from "react";
import UsersPosts from "./UsersPosts";
import AddPost from "./AddPost";
const UserProfile = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("http://localhost:5000/user");
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUsers();
  }, []);
  const [expandedUserId, setExpandedUserId] = useState(null);

  const handleDelete = async (userId) => {
    try {
      await fetch(`http://localhost:5000/user/${userId}`, {
        method: "DELETE",
      });
      const updatedUsers = users.filter((user) => userId !== user.id);
      setUsers(updatedUsers);
      if (expandedUserId === userId) {
        setExpandedUserId(null);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const toggleUserPosts = (userId) => {
    setExpandedUserId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <div className="container" style={{ padding: "3rem" }}>
      <h2>User List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <React.Fragment key={user.id}>
              <tr>
                <td style={{ paddingRight: "5rem" }}>{user.id}</td>
                <td>{user.username}</td>
                <td>
                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "5rem" }}
                    onClick={() => handleDelete(user.id)}
                  >
                    Remove user
                  </button>
                  <button
                    className="btn btn-info"
                    style={{ marginLeft: "1rem" }}
                    onClick={() => toggleUserPosts(user.id)}
                  >
                    {expandedUserId === user.id ? "Hide Posts" : "User Posts"}
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ marginLeft: "1rem" }}
                  >
                    Add Post
                  </button>
                </td>
              </tr>
              {expandedUserId === user.id && (
                <tr className="separator-line">
                  <td colSpan="2">
                    <UsersPosts userId={user.id} />
                    <AddPost userId={user.id} />
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserProfile;
