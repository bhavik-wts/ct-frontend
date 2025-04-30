import React from "react";

const ImplementCard = ({ data }) => {
  // Extract relevant data from the data object
  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    data?.attributes?.slideMainimage?.data?.attributes?.url;
  const name = data?.attributes?.name || "Unknown Implement"; // Fallback if name is null
  const approxWeight = data?.attributes?.approxWeight
    ? `${data.attributes.approxWeight}`
    : "N/A"; // Fallback for weight
  const length = data?.attributes?.length ? `${data.attributes.length}` : "N/A"; // Fallback for length
  const width = data?.attributes?.width ? `${data.attributes.width}` : "N/A"; // Fallback for width
  const height = data?.attributes?.height ? `${data.attributes.height}` : "N/A"; // Fallback for height
  const slug = data?.attributes?.slug;

  return (
    <div className="plough-block">
      <a href={`/implements/${slug}`} className="text-decoration-none">
        <div className="plough-image">
          {imgUrl ? (
            <img src={imgUrl} alt={name} layout="responsive" />
          ) : (
            <div>No image available</div> // Fallback if no image
          )}
        </div>
        <div className="plough-content">
          <h6>{name}</h6>
          <ul>
            <li>
              <p>{approxWeight}</p>
            </li>
            <li>
              <p>
                {length}
                <span> | </span>
                {width}
                <span> | </span>
                {height}
                <span></span>
              </p>
            </li>
          </ul>
        </div>
      </a>
    </div>
  );
};

export default ImplementCard;
