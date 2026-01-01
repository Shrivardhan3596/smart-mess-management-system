import React, { useState } from "react";

function OwnerLogin({ setPage }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    if (username === "owner" && password === "owner123") {
      setPage("owner");
    } else {
      alert("Invalid owner credentials");
    }
  };

  return (
    <div className="login-card">
      <h2>🍽️ Shri Mess</h2>
      <p className="login-subtitle">Owner Login</p>

      <input
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
      <p className="hint">owner / owner123</p>
    </div>
  );
}

export default OwnerLogin;
