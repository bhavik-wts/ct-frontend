import Link from "next/link";
import React from "react";

const CommonMainComponent = ({ data, type }) => {
  const redirectionUrl = data?.attributes?.internationalTractorLink
  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    data?.attributes?.slideMainimage?.data?.attributes?.url;
  return (
    <div className="col-md-8">
      <img
        src={imgUrl}
        alt={data?.attributes?.name || { type }}
        className="img-fluid"
      />
      <div className="menu-tractor-content">
        <h5>{data?.attributes?.name || "Tractor Name"}</h5>
        <ul>
          {type === "tractor" ? (
            <>
              <li>
                <p>{data?.attributes?.tractorType || "Tractor Type"}</p>
              </li>
              <li>
                <p>
                  {data?.attributes?.tractor_category?.data?.attributes?.name ||
                    "Tractor Category"}
                </p>
              </li>
              <li>
                <div className="colors">
                  {data?.attributes?.colors?.data.map((color, index) => (
                    <span
                      key={index}
                      className="color"
                      style={{ backgroundColor: color.attributes.colorCode }}
                      title={color.attributes.colorName}
                    ></span>
                  ))}
                </div>
              </li>
            </>
          ) : (
            <>
              <li>
                <p>{data?.attributes?.approxWeight || "approx weight"}</p>
              </li>
              <li>
                <p>
                  {data?.attributes?.length || "approx length"} |{" "}
                  {data?.attributes?.width || "approx width"} |{" "}
                  {data?.attributes?.height || "approx height"} |
                </p>
              </li>
            </>
          )}
        </ul>
        <p className="menu-product-description">
          {data?.attributes?.description || "Description not available."}
        </p>
        <div className="tractor-links">
          {type === "tractor" ? (
            <>
              <a href={`${redirectionUrl ? redirectionUrl : `/tractors/${data?.attributes?.slug}`}`} target={redirectionUrl ? "_blank" : "_self"} >
                Explore Tractor
              </a>
              {
                (data?.attributes?.tractor_category?.data?.attributes?.name !== "Above 30 HP Tractors" &&
                 data?.attributes?.tractor_category?.data?.attributes?.name !== "Below 30 HP Tractors") && (
                   <a href={`/${data?.attributes?.slug}/viewer`}>360 View</a>
                )
              }
            </>
          ) : (
            <>
              <a href={`/implements/${data?.attributes?.slug}`}>
                Explore Implements
              </a>
            </>
          )}
          <a href="/inquiry">Request a Quote</a>
        </div>
      </div>
    </div>
  );
};

export default CommonMainComponent;
