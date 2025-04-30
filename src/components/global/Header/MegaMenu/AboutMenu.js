import React from "react";

const AboutMenu = () => {
  return (
    <div className="about-menu">
      <div className="row g-4">
        <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
          <div className="menu-card">
            <a href="/about-us">
              <div className="menu-card-image">
                <img
                  src="/images/about-menu-01.jpg"
                  alt="about"
                  className="img-fluid"
                />
              </div>
              <div className="menu-card-body">
                <a>About Company</a>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
          <div className="menu-card">
            <a href="/company-history">
              <div className="menu-card-image">
                <img
                  src="/images/about-menu-02.jpg"
                  alt="about"
                  className="img-fluid"
                />
              </div>
              <div className="menu-card-body">
                <a>Company History</a>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
          <div className="menu-card">
            <a href="/events">
              <div className="menu-card-image">
                <img
                  src="/images/about-menu-03.jpg"
                  alt="about"
                  className="img-fluid"
                />
              </div>
              <div className="menu-card-body">
                <a>Events</a>
              </div>
            </a>
          </div>
        </div>
        <div className="col-md-4 col-lg-4 col-xl-4 col-xxl-6">
          <div className="menu-card">
            <a href="/social-contributions">
              <div className="menu-card-image">
                <img
                  src="/images/about-menu-04.jpg"
                  alt="about"
                  className="img-fluid"
                />
              </div>
              <div className="menu-card-body">
                <a>Social Contribution</a>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMenu;
