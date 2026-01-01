import React, { useEffect } from "react";

function CustomerView({ customer, logout }) {

  // ✅ CUSTOMER ALERT WHEN MESS COMPLETES
  useEffect(() => {
    if (customer.meals >= 30) {
      alert(
        "Your mess period is completed.\nPlease complete your payment to continue the service."
      );
    }
  }, [customer.meals]);

  return (
    <div className="home-container">
      <div className="header">
        <h2>🍽️ Shri Mess</h2>
        <button onClick={logout}>Logout</button>
      </div>

      {/* PAYMENT SCANNER (CUSTOMER ONLY) */}
      <div className="card" style={{ textAlign: "center" }}>
        <h3>Scan to Pay</h3>
        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=ShriMessPayment"
          alt="Payment QR"
        />
        <p>Pay and inform mess owner after payment</p>
      </div>

      {/* CUSTOMER DATA (READ-ONLY) */}
      <div className="card">
        <h3>My Mess Details</h3>

        <p><b>Name:</b> {customer.name}</p>
        <p><b>Contact:</b> {customer.contact}</p>
        <p><b>Address:</b> {customer.address}</p>
        <p><b>Meals:</b> {customer.meals} / 30</p>
        <p><b>Payment:</b> ₹{customer.paid} / ₹{customer.total}</p>
        <p><b>Status:</b> {customer.completed ? "Completed" : "Active"}</p>

        <p style={{ color: "gray", fontSize: "14px" }}>
          *You can only view your data.  
          For any changes, please contact the mess owner.
        </p>
      </div>
    </div>
  );
}

export default CustomerView;
