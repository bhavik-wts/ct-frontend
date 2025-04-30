import React from "react";

const MainSlide = ({ name, url }) => {
  const imgUrl = process.env.NEXT_PUBLIC_STRAPI_URL + url;

  return (
    <div className="slider-for-image">
      <img src={imgUrl} alt={name} className="img-fluid" />
    </div>
  );
};

export default MainSlide;
