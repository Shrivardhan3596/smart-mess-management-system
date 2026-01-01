import React, { useState } from "react";

function Login({ setPage, setUser }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(u => u.name === name && u.password === password);

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    setUser(user);
    setPage(user.role === "owner" ? "owner" : "customer");
  };

  return (
    <div className="box">
      <h2>Login – Shri Mess</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
      <button onClick={login}>Login</button>
      <p onClick={() => setPage("signup")}>Create new account</p>
    </div>
  );
}

export default Login;
