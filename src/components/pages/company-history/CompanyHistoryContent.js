import React from "react";

const CompanyHistoryContent = ({ title, heading, posterImage, description, video }) => {
  return (
    <>
      <section className="milstobne-video py-80">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-10">
              <div className="milestone-video-block">
                <img
                  src="/images/history-poster.jpg"
                  alt="history"
                  className="img-fluid"
                />
                <div className="video-play-button">
                  <button>
                    <svg
                      width="21"
                      height="26"
                      viewBox="0 0 21 26"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.42633 25.3011L19.9263 14.0511C20.2828 13.8215 20.5 13.4248 20.5 13C20.5 12.5752 20.2828 12.1784 19.9263 11.949L2.42633 0.698957C2.04301 0.448644 1.54742 0.435284 1.15191 0.652549C0.749024 0.872276 0.5 1.29228 0.5 1.75001V24.25C0.5 24.7077 0.749024 25.1277 1.15191 25.3475C1.33742 25.4487 1.54496 25.5 1.75004 25.5C1.98441 25.5 2.22125 25.4341 2.42633 25.3011Z"
                        fill="#201E1E"
                      ></path>
                    </svg>
                  </button>
                </div>
                <div className="top-frame">
                  <img src="/images/frame-top-pattern.svg" alt="pattern" />
                </div>
                <div className="right-frame">
                  <img src="/images/frame-orange-pattern.svg" alt="pattern" />
                </div>
                <div className="left-frame">
                  <img src="/images/frame-blue-pattern.svg" alt="pattern" />
                </div>
              </div>
            </div>
            <div className="col-md-12">
              <div className="milstone-video-content">
                <p>
                  Success is valued by strength of the DESIRE. This saying
                  perfectly reflects the Journey of Captain Tractors Pvt. Ltd. A
                  single new thought of visionary farmer brothers changed the
                  dimensions of Agri world. Indias 1st Mini tractor was
                  introduced in 1998, by ultimate efforts of Mr. G.T. Patel &
                  Mr. M.T. Patel whose journey started with smallest HP tractor,
                  continued with its segments, by adopting modern technological
                  aspects, tools & equipment along with high facilitate skilled
                  & qualified staff.
                </p>
                <p>
                  Everyone thinks Ordinary but one who wants to reach at the
                  height, always thinks Extra Ordinary. New generation brought
                  out different era. Considering solutions for farmers, Product
                  is designed at its best for its optimum utilization. Captain
                  Tractors has always been a strongest shoulder of every farmer
                  which helps up bring the golden fields. We have always trying
                  to give farmer the worthwhile product, which helps them earn,
                  as well as to save their energy, money and time. Our motto is
                  to satisfy customer at our best. Services facilitated to each
                  customer are at their doorstep.
                </p>
                <p>
                  Captain Tractors is an agricultural visionary company, having
                  a Vision & Mission of shining in the field of mini tractors.
                  To satisfy the farmers at their fullest, we have started with
                  various categories range of implements which added a feather
                  to Captain Tractors. Going beyond from the boundaries of
                  India, we also export our all product in overseas market.
                </p>
                <p>
                  Born due to our impressive innovation in R&D and
                  entrepreneurship, we have been honoured with 9 National and
                  State Level Awards. ISO 9001- 2015 CERTIFICATE issued reflects
                  Captain Tractors system and punctuality towards Quality as
                  well as Products.
                </p>
                <p>
                  We have always proved our identity in Global Market. We will
                  work out with same bringing up many models which would ease
                  the work of farmers and drag Agriculture to a different orbit.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default CompanyHistoryContent;
