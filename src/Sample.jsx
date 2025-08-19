import React, { useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: crypto.randomUUID(),
    name: "",
    age: "",
  });

  const resetForm = () => {
    setUserInfo({
      id: crypto.randomUUID(),
      name: "",
      age: "",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const saveData = () => {
    if (!userInfo.name || !userInfo.age) return alert("Fill all fields");

    setUsers((prev) => {
      const exists = prev.some((u) => u.id === userInfo.id);
      return exists
        ? prev.map((u) => (u.id === userInfo.id ? userInfo : u)) // update
        : [...prev, userInfo]; // add
    });

    resetForm();
  };

  const handleEdit = (user) => setUserInfo(user);

  const handleDelete = (id) =>
    setUsers((prev) => prev.filter((u) => u.id !== id));

  return (
    <div className="main">
      <h2>User Form</h2>

      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={userInfo.name}
          onChange={handleChange}
        />
        <input
          type="number"
          name="age"
          placeholder="Enter your age"
          value={userInfo.age}
          onChange={handleChange}
        />

        <button onClick={saveData}>
          {users.some((u) => u.id === userInfo.id) ? "Update" : "Add"}
        </button>
        <button onClick={resetForm}>Cancel</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.age}</td>
                <td>
                  <button onClick={() => handleEdit(u)}>Edit</button>
                  <button onClick={() => handleDelete(u.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
