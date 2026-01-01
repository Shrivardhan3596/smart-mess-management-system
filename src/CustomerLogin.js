import React, { useState } from "react";

function CustomerLogin({ setPage, setCustomerData }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const login = () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Match only FIRST NAME
    const customer = customers.find(
      (c) => c.name.split(" ")[0].toLowerCase() === name.toLowerCase()
    );

    if (!customer) {
      alert("Customer not found");
      return;
    }

    // Password = firstname + 123
    if (password !== name.toLowerCase() + "123") {
      alert("Invalid password");
      return;
    }

    setCustomerData(customer);
    setPage("customer");
  };

  return (
    <div className="card">
      <h3>Customer Login</h3>

      <input
        type="text"
        placeholder="First Name (e.g. Raj)"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (firstname123)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={login}>Login</button>
    </div>
  );
}

export default CustomerLogin;
