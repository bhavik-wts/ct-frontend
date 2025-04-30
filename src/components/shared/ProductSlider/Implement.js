import Link from "next/link";
import React from "react";

const Implement = ({ data, isWhite }) => {
  console.log(isWhite);
  const imgAlt = data.attributes.slideMainimage?.data?.attributes.url;
  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    data.attributes.slideMainimage?.data?.attributes.url;
  return (
    <>
      <Link
        href={`/implements/${data.attributes.slug ? data.attributes.slug : ""}`}
        className="text-decoration-none"
      >
        <div className="feature-block">
          <div className="feature-image text-center">
            <img src={imgUrl} alt={imgAlt} />
          </div>
          <div
            style={{ backgroundColor: !isWhite ? "white" : "#F26B350D" }}
            className="feature-content"
          >
            <h6>{data.attributes.name}</h6>
            <ul>
              <li>
                <p>{data.attributes.approxWeight}</p>
              </li>
              <li>
                <p>
                  {data.attributes.length} | {data.attributes.height} |{" "}
                  {data.attributes.height}
                </p>
              </li>
            </ul>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Implement;
