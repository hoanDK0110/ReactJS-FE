// App.js

import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({});

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = () => {
    axios.get("http://localhost:8080/api/users").then((response) => {
      setUsers(response.data);
    });
  };

  const handleChange = (event) => {
    setNewUser({ ...newUser, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post("http://localhost:8080/api/users/add", newUser).then((response) => {
      fetchUsers();
      setNewUser({});
    });
  };

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={newUser.username || ""}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email || ""}
          onChange={handleChange}
        />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
