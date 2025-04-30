import React, { useEffect } from "react";

const AwardImageComponent = ({ data }) => {
  const { heading, toptitle } = data;
  const url = data.slideimage.data.attributes.url;
  // console.log("url", url);

  return (
    <>
      <div className="award-slider-image">
        <div className="section-title">
          <h3>{toptitle}</h3>
          <h2>{heading}</h2>
        </div>
        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + url} alt="award" />
      </div>
    </>
  );
};

export default AwardImageComponent;
