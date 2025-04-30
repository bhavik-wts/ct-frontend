import React from "react";
import NetworkListing from "./NetworkListing";
import DomesticNetworkMap from "./DomesticNetworkMap";

const DomesticNetworkContainer = () => {
  return (
    <>
      <section className="domestic py-80">
        <div className="container">
          <div className="row g-5">
            <DomesticNetworkMap />
            <NetworkListing />
          </div>
        </div>
      </section>
    </>
  );
};

export default DomesticNetworkContainer;
