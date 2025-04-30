import React from "react";

const AboutSection = () => {
  return (
    <>
      <section className="about-us py-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12 col-lg-6">
              <div className="section-title">
                <h3>About Us</h3>
                <h2>Manufacturers & Exporters of Compact Tractors</h2>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="section-title">
                <p>
                  Since 1994, Captain Tractors Pvt Ltd is one of the leading
                  manufacturers of Mini Tractors and implements used in farming.
                  We are also exporter of agriculture products and machineries.
                  We were Previously known as Asha Exim Pvt Ltd which was
                  founded by two farmer brothers G T Patel and M T Patel of
                  Rajkot.
                </p>
                <p>
                  Purpose behind establishment of Captain Tractors Pvt Ltd was
                  to develop such a tractor which can be affordable, efficient,
                  lower in the maintenance cost and higher in the millage.
                </p>
                <a href="/about-us">Know More</a>
              </div>
            </div>
          </div>
          <div className="about-card-wrapper">
            <div className="row g-4">
              <div className="col-sm-6 col-lg-6 col-xl-3">
                <div className="about-card">
                  <span>
                    <img src="images/about_01.svg" alt="about" />
                  </span>
                  <h6>Best-in-Class Power</h6>
                  <p>
                    With lowest RPM drop across the range for optimised output.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-3">
                <div className="about-card">
                  <span>
                    <img src="images/about_02.svg" alt="about" />
                  </span>
                  <h6>Best-in-Class Mileage</h6>
                  <p>
                    Save more with lower fuel consumption per hour of operation.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-3">
                <div className="about-card">
                  <span>
                    <img src="images/about_03.svg" alt="about" />
                  </span>
                  <h6>Best-in-Class Technology</h6>
                  <p>
                    Specifically designed tractors for all your
                    application-based needs.
                  </p>
                </div>
              </div>
              <div className="col-sm-6 col-lg-6 col-xl-3">
                <div className="about-card">
                  <span>
                    <img src="images/about_04.svg" alt="about" />
                  </span>
                  <h6>5-Year Warranty</h6>
                  <p>
                    Longest warranty period in the market for continued
                    aftersales support.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
