import React from "react";

const InqueryMenu = () => {
  return (
    <>
      <div className="inquiry-menu ">
        <div className="row g-4">
          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
            <div className="menu-card">
              <a href="/inquiry?tab=Domestic">
                <div className="menu-card-image">
                  <img
                    src="/images/inquiry-menu-01.jpg"
                    alt="about"
                    className="img-fluid"
                  />
                </div>
                <div className="menu-card-body">
                  <a>Domestic Inquiry</a>
                </div>
              </a>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
            <div className="menu-card">
              <a href="/inquiry?tab=International">
                <div className="menu-card-image">
                  <img
                    src="/images/inquiry-menu-02.jpg"
                    alt="about"
                    className="img-fluid"
                  />
                </div>
                <div className="menu-card-body">
                  <a>International Inquiry</a>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InqueryMenu;
