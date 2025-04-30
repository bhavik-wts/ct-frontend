import Link from "next/link";
import React from "react";

const NetworkMenu = () => {
  return (
    <>
      <div className="network-menu ">
        <div className="row g-4">
          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
            <div className="menu-card">
              <a href="/domestic-network">
                <div className="menu-card-image">
                  <img
                    src="/images/network-menu-01.jpg"
                    alt="Network"
                    className="img-fluid"
                  />
                </div>
                <div className="menu-card-body">
                  <a>Domestic Network</a>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
            <div className="menu-card">
              <a href="/international-network">
                <div className="menu-card-image">
                  <img
                    src="/images/network-menu-02.jpg"
                    alt="Network"
                    className="img-fluid"
                  />
                </div>
                <div className="menu-card-body">
                  <a>International Network</a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NetworkMenu;
