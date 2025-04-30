import React from "react";

const DealerStats = () => {
  return (
    <>
      <section className="facts py-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-10">
              <div className="section-title text-center">
                <h3>Captain Facts</h3>
                <h2 className="text-white">
                  Lorem Ipsum is dummy text of the printing
                </h2>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industrys
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
              </div>
            </div>
          </div>
          <div className="facts-list">
            <div className="row g-4 g-xl-4">
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_01.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>1960</h6>
                    <p>Incorporated</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_02.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>12,500</h6>
                    <p>Crores Turnover</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_03.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>3rd</h6>
                    <p>Largest by Volumes</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_04.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>250</h6>
                    <p>Acres Research Facility</p>
                  </div>
                </div>
              </div>

              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_05.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>100+</h6>
                    <p>Countries</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_06.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>1,600+</h6>
                    <p>Dealers</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_07.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>30,00,000+</h6>
                    <p>Tractors Cultivating</p>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-lg-4 col-xl-3">
                <div className="fact-wrapper">
                  <span>
                    <img src="/images/fact_08.svg" alt="fact" />
                  </span>
                  <div className="fact-content">
                    <h6>100+</h6>
                    <p>Dummy Text</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DealerStats;
