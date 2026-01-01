import React, { useState } from "react";

function Signup({ setPage }) {

  // ✅ STATE VARIABLES (THIS WAS MISSING)
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("customer");

  const signup = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const id = Date.now(); // unique ID

    users.push({
      id,
      username,
      password,
      role
    });

    localStorage.setItem("users", JSON.stringify(users));
    alert(`Signup successful! Your ID is ${id}`);
    setPage("login");
  };

  return (
    <div className="box">
      <h2>Signup – Shri Mess</h2>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <select onChange={(e) => setRole(e.target.value)}>
        <option value="customer">Customer</option>
        <option value="owner">Mess Owner</option>
      </select>

      <button onClick={signup}>Signup</button>

      <p onClick={() => setPage("login")}>Already have an account?</p>
    </div>
  );
}

export default Signup;
