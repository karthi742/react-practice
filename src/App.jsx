import React, { useEffect, useState } from "react";
import "./App.css";


function App() {
  const API_URL = 'https://express-js-j2v6.onrender.com';

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

  const fetchdata = async () => {
    try {
      const userlist = await fetch(`${API_URL}/user/list`);
      const response = await userlist.json();
      setUsers(response);

      return response;
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const addData = async () => {
    console.log(userInfo);
    const response = await fetch(`${API_URL}/user/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        age: userInfo.age,
      }),
    });
    fetchdata();
  };

  const deleteData = async (id) => {
    const del = await fetch(`${API_URL}/user/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    fetchdata();
    console.log(del);
  };

  const updateData = async () => {
    console.log(userInfo);
    await fetch(`${API_URL}/user/update/${userInfo.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        name: userInfo.name,
        age: userInfo.age,
      }),
    });
    cancelData();
    fetchdata();
  };

  const handleEditData = async (currentUser) => {
    console.log("handleEditData", currentUser);
    const getData = await fetch(
      `${API_URL}/user/${currentUser.id}`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
        },
      }
    );
    const data = await getData.json();
    setUserInfo(data[0]);
    setButtonChange("edit");
  };

  const cancelData = () => {
    setUserInfo({
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
            Add
          </button>
        ) : (
          <>
            <button id="update" onClick={updateData}>
              Update
            </button>
            <button id="cancel" onClick={cancelData}>
              Cancel
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
