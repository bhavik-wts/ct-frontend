"use client";

import React, { useState } from "react";
import InternationalMap from "./InternationalMap";
import InternationalNetworkTabs from "./InternationalNetworkTabs";
import InternationalDistributorsDealersListing from "./InternationalDistributorsDealersListing";
import InternationalDirectSalesListing from "./InternationalDirectSalesListing";

const InternationalNetworkContainer = () => {
  const [activeTab, setActiveTab] = useState("distributors"); // default tab

  return (
    <>
      <section className="international">
        <div className="container">
          <InternationalNetworkTabs
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="int-tab-wrapper">
            {/* Conditional Content */}
            {activeTab === "distributors" && (
              <div>
                <InternationalMap />
                <InternationalDistributorsDealersListing />
              </div>
            )}
            {activeTab === "directSales" && (
              <div>
                <InternationalMap />
                <InternationalDirectSalesListing />
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default InternationalNetworkContainer;
