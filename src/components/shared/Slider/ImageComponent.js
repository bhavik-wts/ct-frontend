import React from "react";

const ImageComponent = ({ data, isGalleryImageCard }) => {
  const imgUrl = data.slideimage.data.attributes.url;
  const name = data.slideimage.data.attributes.name;
  return (
    <div
      style={{
        minHeight: isGalleryImageCard ? 0 : "",
      }}
      className="blog-wrapper"
    >
      <div className="blog-image">
        <img src={process.env.NEXT_PUBLIC_STRAPI_URL + imgUrl} alt={name} />
      </div>
    </div>
  );
};

export default ImageComponent;
