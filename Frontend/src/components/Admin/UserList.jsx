// UserList.jsx
import React, { useState, useEffect } from "react";
import { getUserList } from "../../api";
import "./UserList.css";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUserList()
      .then((res) => setUsers(res))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="user-list-container">
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
