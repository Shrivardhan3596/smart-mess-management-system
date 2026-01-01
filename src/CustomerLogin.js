import React, { useState } from "react";

function CustomerLogin({ setPage, setCustomerData }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const loginCustomer = () => {
    const customers = JSON.parse(localStorage.getItem("customers")) || [];

    const customer = customers.find(
      (c) => c.name.toLowerCase() === name.toLowerCase()
    );

    if (!customer) {
      alert("Customer not found");
      return;
    }

    if (password !== name.toLowerCase() + "123") {
      alert("Invalid password");
      return;
    }

    setCustomerData(customer);
    setPage("customer");
  };

  return (
    <div className="login-card">
      <h3>👤 Customer Login</h3>

      <input
        placeholder="Customer Name eg: raj"
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password (name123) eg: raj123"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={loginCustomer}>Login</button>
    </div>
  );
}

export default CustomerLogin;
