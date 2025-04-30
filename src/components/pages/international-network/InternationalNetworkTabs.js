import React from "react";

const InternationalNetworkTabs = ({ activeTab, setActiveTab }) => {
  return (
    <div className="listing-tabs">
      <div className="container">
        <div className="row justify-content-center">
          <ul className="nav nav-tabs">
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "distributors" ? "active" : ""
                }`}
                onClick={() => setActiveTab("distributors")}
              >
                Distributors / Dealers
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${
                  activeTab === "directSales" ? "active" : ""
                }`}
                onClick={() => setActiveTab("directSales")}
              >
                Direct Sales to
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default InternationalNetworkTabs;
