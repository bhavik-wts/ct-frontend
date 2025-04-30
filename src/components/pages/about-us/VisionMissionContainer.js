import React from "react";

const VisionMissionContainer = () => {
  return (
    <>
      <section className="vision py-80">
        <div className="container">
          <div className="row justify-content-center g-5">
            <div className="col-md-10">
              <div className="section-title text-center">
                <h3>Vision, Mission & Core Values</h3>
                <h2>Dreams… Which don’t Allow You to Sleep</h2>
                <p>
                  As famous saying, we have set our Mission, Vision and Core
                  Values which keep us inspired always, which fill up an energy
                  like a sip of coffee or a bite of chocolate! which are the
                  reasons why do we wake up in the morning. Each Captain stays
                  always committed and works parallelly to our goals and dreams.
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="vision-block mb-30">
                <span>
                  <img src="images/vision.svg" alt="vision" />
                </span>
                <div className="vision-content">
                  <h6>Our Vision</h6>
                  <p>
                    To Be A Global Leader In The Tractor And Agricultural
                    Machinery Industry With Innovative & Sustainable Solutions.
                  </p>
                </div>
              </div>
              <div className="vision-block">
                <span>
                  <img src="images/mission.svg" alt="vision" />
                </span>
                <div className="vision-content">
                  <h6>Our Mission</h6>
                  <p>
                    Reach Every Farmer and lead their life, through various
                    solutions of the farm mechanization for revolution in
                    agriculture.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="vision-block h-100">
                <span>
                  <img src="images/values.svg" alt="values" />
                </span>
                <div className="vision-content">
                  <h6>Our Core Values</h6>
                  <ul>
                    <li>
                      <img src="images/correct-green.svg" alt="correct" />
                      <p>Work with Honesty, Trust and Transparency</p>
                    </li>
                    <li>
                      <img src="images/correct-green.svg" alt="correct" />
                      <p>
                        Happiness in customers life with satisfaction of our
                        Best Quality products performance
                      </p>
                    </li>
                    <li>
                      <img src="images/correct-green.svg" alt="correct" />
                      <p>
                        Creating the future with continuous Change & Innovation
                      </p>
                    </li>
                    <li>
                      <img src="images/correct-green.svg" alt="correct" />
                      <p>
                        Growing Together approach to develop our associates with
                        trust, respect and value them in all our interaction and
                        relation
                      </p>
                    </li>
                    <li>
                      <img src="images/correct-green.svg" alt="correct" />
                      <p>Growth with values and ethics</p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionMissionContainer;
