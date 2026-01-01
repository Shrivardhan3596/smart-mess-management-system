import React, { useState } from "react";

function Home({ setLoggedIn }) {
  const [customers, setCustomers] = useState(
    JSON.parse(localStorage.getItem("customers")) || []
  );

  const [selectedIndex, setSelectedIndex] = useState(null);
  const [showSummary, setShowSummary] = useState(false);
  const [search, setSearch] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    address: "",
    total: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ---------------- ADD CUSTOMER ----------------
  const addCustomer = (e) => {
    e.preventDefault();
    const { name, contact, address, total } = formData;

    if (!name || !contact || !address || !total) {
      alert("All fields required");
      return;
    }

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 30);

    const newCustomer = {
      id: "CUST-" + Date.now(),
      name,
      contact,
      address,
      total: Number(total),
      paid: 0,
      meals: 0,
      start: start.toDateString(),
      end: end.toDateString(),
      completed: false
    };

    const updated = [...customers, newCustomer];
    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
    setFormData({ name: "", contact: "", address: "", total: "" });
  };

  // ---------------- MARK MEAL ----------------
  const markMeal = (i) => {
    const updated = [...customers];
    if (updated[i].meals >= 30) return;

    updated[i].meals += 1;

    if (updated[i].meals === 30) {
      updated[i].completed = true;
      alert(`${updated[i].name} mess is over`);
    }

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
  };

  // ---------------- PAYMENT ----------------
  const confirmPayment = (i) => {
    const amount = prompt("Enter payment amount");
    if (!amount || Number(amount) <= 0) return;

    const updated = [...customers];
    updated[i].paid += Number(amount);

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
  };

  // ---------------- EXTEND MESS ----------------
  const extendMess = (i) => {
    const updated = [...customers];

    updated[i].meals = 0;
    updated[i].paid = 0;
    updated[i].completed = false;

    const start = new Date();
    const end = new Date();
    end.setDate(start.getDate() + 30);

    updated[i].start = start.toDateString();
    updated[i].end = end.toDateString();

    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));

    alert(`${updated[i].name} mess restarted from beginning`);
  };

  // ---------------- DELETE ----------------
  const deleteCustomer = (i) => {
    if (!window.confirm("Delete customer?")) return;

    const updated = customers.filter((_, index) => index !== i);
    setCustomers(updated);
    localStorage.setItem("customers", JSON.stringify(updated));
    setSelectedIndex(null);
  };

  // ---------------- SUMMARY ----------------
  const totalAmount = customers.reduce((s, c) => s + c.total, 0);
  const totalPaid = customers.reduce((s, c) => s + c.paid, 0);

  // 🔍 FILTER
  const filteredCustomers = customers.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="home-container">

      {/* 🔝 HEADER WITH SMALL SEARCH */}
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px"
        }}
      >
        <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>
          🍽️ Shri Mess
        </h2>

        {/* 🔍 SMALL SEARCH BAR */}
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "6px 10px",
            width: "180px",
            borderRadius: "6px",
            border: "1px solid #ccc"
          }}
        />

        <div style={{ marginLeft: "auto" }}>
          <button onClick={setLoggedIn}>Logout</button>
        </div>
      </div>

      {/* MONTHLY SUMMARY */}
      <div className="card">
        <h3 onClick={() => setShowSummary(!showSummary)}>
          Monthly Summary {showSummary ? "▲" : "▼"}
        </h3>

        {showSummary && (
          <>
            <p>Total Customers: {customers.length}</p>
            <p>Total Amount: ₹{totalAmount}</p>
            <p>Total Paid: ₹{totalPaid}</p>
            <p>Remaining: ₹{totalAmount - totalPaid}</p>
          </>
        )}
      </div>

      {/* ADD CUSTOMER */}
      <div className="card">
        <h3>Add Customer</h3>
        <form onSubmit={addCustomer}>
          <input name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
          <input name="contact" placeholder="Contact" value={formData.contact} onChange={handleChange} />
          <input name="address" placeholder="Address" value={formData.address} onChange={handleChange} />
          <input name="total" type="number" placeholder="Total Amount" value={formData.total} onChange={handleChange} />
          <button>Add</button>
        </form>
      </div>

      {/* CUSTOMER LIST */}
      <div className="card">
        <h3>Customer List</h3>

        {filteredCustomers.length === 0 && <p>No customer found</p>}

        {filteredCustomers.map((c) => {
          const i = customers.indexOf(c);

          return (
            <div key={c.id} className="customer-item">
              <p onClick={() => setSelectedIndex(i)}>
                {i + 1}) {c.name}
              </p>

              {selectedIndex === i && (
                <div className="customer-details">
                  <p>Meals: {c.meals} / 30</p>
                  <p>Paid: ₹{c.paid} / ₹{c.total}</p>
                  <p>Status: {c.completed ? "Completed" : "Active"}</p>

                  <button onClick={() => markMeal(i)}>Mark Meal</button>
                  <button onClick={() => confirmPayment(i)}>Payment</button>

                  {c.completed && (
                    <button onClick={() => extendMess(i)}>Extend Mess</button>
                  )}

                  <button className="danger" onClick={() => deleteCustomer(i)}>
                    Delete
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
