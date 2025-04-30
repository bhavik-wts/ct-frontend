import React from "react";

const MilestoneJourney = ({ topTitle, heading, backgroungImage }) => {
  console.log("topTitle", topTitle, "heading", heading, "backgroundImage", backgroungImage);

  return (
    <>
      <section className="milestone py-80">
        <div className="container">
          <div className="row g-4 justify-content-center">
            <div className="col-md-12 col-lg-4">
              <div className="section-title">
                <h3>{topTitle}</h3>
                <h2>{heading}</h2>
              </div>
            </div>
            <div className="col-md-10 col-lg-8">
              <div className="image-block">
                <img
                  src={process.env.NEXT_PUBLIC_STRAPI_URL + backgroungImage.data.attributes.url}
                  alt="milestone"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default MilestoneJourney;
