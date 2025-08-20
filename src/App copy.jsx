import React, { useState } from "react";
import "./App.css";
import { v4 as uuid } from "uuid";

function App() {
  const [buttonChange, setButtonChange] = useState("add");
  const [users, setUsers] = useState([]);
  const [userInfo, setUserInfo] = useState({
    id: crypto.randomUUID(),
    name: "",
    age: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setUserInfo((currentValue) => {
      return { ...currentValue, [name]: value };
    });
  };

  const addData = () => {
    setUsers((currentValue) => [...currentValue, userInfo]);
    setUserInfo({
      id: crypto.randomUUID(),
      name: "",
      age: "",
    });
    console.log(userInfo);
  };

  const deleteData = (id) => {
    setUsers((alluser) => {
      return alluser.filter((user) => user.id !== id);
    });
  };
  const updateData = () => {
    setUsers((alluser) => {
      return alluser.map((user) => {
        if (user.id == userInfo.id) {
          return userInfo;
        }
        return user;
      });
    });
    cancelData();
  };

  const handleEditData = (alluser) => {
    setUserInfo(alluser);
    setButtonChange("edit");
  };

  const cancelData = () => {
    setUserInfo({
      id: crypto.randomUUID(),
      name: "",
      age: "",
    });
    setButtonChange("add");
  };

  return (
    <div className="main">
      <h2>User Form</h2>

      {/* Form */}
      <div className="form">
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          onChange={handleChange}
          value={userInfo.name}
        />
        <input
          type="text"
          name="age"
          placeholder="Enter your age"
          onChange={handleChange}
          value={userInfo.age}
        />
        {buttonChange == "add" ? (
          <button id="add" onClick={addData}>
            {" "}
            Add{" "}
          </button>
        ) : (
          <>
            <button id="update" onClick={updateData}>
              {" "}
              Update{" "}
            </button>
            <button id="cancel" onClick={cancelData}>
              {" "}
              Cancel{" "}
            </button>
          </>
        )}
      </div>

      {/* Table */}
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
            {users.map((value, index) => (
              <tr key={value.id}>
                <td>{value.name}</td>
                <td>{value.age}</td>
                <td>
                  <button onClick={() => handleEditData(value)}>Edit</button>
                  <button onClick={() => deleteData(value.id)}>Delete</button>
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
