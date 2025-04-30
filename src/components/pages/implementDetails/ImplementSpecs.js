import React from "react";

const ImplementSpecs = ({ specificationTitle,
  specificationMainTitle, allSpecs }) => {
  return (
    <section className="py-80 specification">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-4">
            <div className="section-title">
              <h3>{specificationTitle}</h3>
              <h2>{specificationMainTitle}</h2>
            </div>
          </div>
          <div className="col-md-12 col-lg-8">
            <div className="row g-4">
              {allSpecs.map((spec, index) => (
                spec.value !== null ? (
                  <div key={index} className="col-sm-6 col-md-4 col-lg-4 col-xl-3">
                    <div className="spec-block">
                      <span>{spec.label}</span>
                      <h6>{spec.value}</h6>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImplementSpecs;
