import React from "react";

const CareerContentSection = ({ isLeft, img, children }) => {
  return (
    <>
      <section className="event-listing job mt-130">
        <div className="container">
          <div className="row align-items-center g-4 g-md-5">
            {isLeft ? (
              <>
                <div className="col-md-12 col-lg-5">
                  <div className="event-listing-image position-relative">
                    <img
                      src={`images/${img}`}
                      alt="event"
                      className="img-fluid"
                    />
                    <div className="top-pattern">
                      <img src="images/frame-blue-pattern.svg" alt="pattern" />
                    </div>
                    <div className="bottom-pattern">
                      <img
                        src="images/event-orange-pattern.svg"
                        alt="pattern"
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-12 col-lg-7">
                  <div className="section-title">{children}</div>
                </div>
              </>
            ) : (
              <>
                <div className="col-md-12 col-lg-7">
                  <div className="section-title">{children}</div>
                </div>
                <div className="col-md-12 col-lg-5">
                  <div className="event-listing-image position-relative">
                    <img
                      src={`images/${img}`}
                      alt="event"
                      className="img-fluid"
                    />
                    <div className="top-pattern">
                      <img src="images/frame-blue-pattern.svg" alt="pattern" />
                    </div>
                    <div className="bottom-pattern">
                      <img
                        src="images/event-orange-pattern.svg"
                        alt="pattern"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CareerContentSection;
