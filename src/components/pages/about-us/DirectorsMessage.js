import React from "react";

const DirectorsMessage = () => {
  return (
    <>
      <section className="director-message py-80">
        <div className="container">
          <div className="row g-5">
            <div className="col-md-12 col-lg-6">
              <div className="director-image">
                <img
                  src="images/board-director.png"
                  alt="director"
                  className="img-fluid"
                />
                <div className="director-name">
                  <h6>Mr. Rajesh Patel</h6>
                  <p>Managing Director</p>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-6">
              <div className="section-title">
                <h3>Message from our Board of Director</h3>
                <h2>Growth is in Our Veins</h2>
                <div className="position-relative mt-3">
                  <p>
                    Success of any organization is defined by overall growth in
                    the market and values in the society. We at Captain Tractors
                    Pvt Ltd believe in the credo of maintaining our global
                    Quality Standards with putting the customer at our first
                    priority. We control the most on the material waste and our
                    product is environment friendly as per global emission
                    standards.We are also looking forward for the growth of our
                    dealers and suppliers. Our emphatic desire isto bring an
                    evolution in the method of Traditional Farming Operations,
                    supplying our products within the economic price range and
                    to carry lowest maintenance cost. We are looking forward to
                    develop new geographic& business models, to concentrate
                    onpremiumization, creating diversification through our best
                    service, market expansions, achieving higher productivity
                    and increasing the efficiency of our work. Parallellywe are
                    working to make our employee engage for enriching volunteer
                    experiences through various social activities. For the
                    welfare of the society, we are also planning for expansion
                    of the plant to generate maximum employment opportunities
                    and giving a platform to the right talents.
                  </p>
                  <p>
                    Walking with a vision of reaching to each farmer and
                    enlighten their lives by bringing a revolution in
                    agriculture, we are prepared to face every challenge with
                    excellent workmanship, attracting and utilizing the right
                    talent in optimum way and maintaining the excellent level of
                    corporate governance.
                  </p>
                  <div className="quote-left">
                    <img src="images/quote-left.svg" alt="quote" />
                  </div>
                  <div className="quote-right text-end">
                    <img src="images/quote-right.svg" alt="quote" />
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

export default DirectorsMessage;
