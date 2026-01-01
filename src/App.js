import React, { useState } from "react";
import OwnerLogin from "./OwnerLogin";
import CustomerLogin from "./CustomerLogin";
import Home from "./Home";
import CustomerView from "./CustomerView";

function App() {
  const [page, setPage] = useState("login");
  const [customerData, setCustomerData] = useState(null);

  return (
    <>
      {page === "login" && (
        <div className="login-container">
          <OwnerLogin setPage={setPage} />
          <CustomerLogin setPage={setPage} setCustomerData={setCustomerData} />
        </div>
      )}

      {page === "owner" && <Home setLoggedIn={() => setPage("login")} />}

      {page === "customer" && (
        <CustomerView
          customer={customerData}
          logout={() => setPage("login")}
        />
      )}
    </>
  );
}

export default App;
