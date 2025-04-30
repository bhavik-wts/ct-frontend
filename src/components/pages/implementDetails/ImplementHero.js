import React from "react";
import HeroSlider from "../implements/HeroSlider";

const ImplementHero = ({ data }) => {
  const {
    name,
    description,
    implement_category,
    slideMainimage,
    sliderDetail,
  } = data?.attributes || {};

  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL + slideMainimage?.data?.attributes?.url;

  return (
    <section className="plough-slider-wrapper py-80">
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-6">
            <div className="section-title mb-0">
              <h3>{implement_category?.data?.attributes?.name}</h3>
              <h2>{name}</h2>
            </div>
          </div>
          <div className="col-md-12 col-lg-6">
            <div className="section-title">
              <p>{description || "No description available."}</p>
            </div>
          </div>
        </div>
        <HeroSlider mainSlidesData={sliderDetail} navSlidesData={sliderDetail} />
      </div>
    </section>
  );
};

export default ImplementHero;
