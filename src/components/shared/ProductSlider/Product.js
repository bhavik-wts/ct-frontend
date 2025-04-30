import Link from "next/link";
import React from "react";

const Product = ({ data, isImplement, isWhite }) => {
  console.log("data", data);

  // Check if data is not available
  if (!data || !data.attributes) {
    return null; // Return null or an empty fragment
  }

  const redirectionPage = isImplement ? `/implements/` : `/tractors/`;
  const redirectionUrl = data?.attributes?.internationalTractorLink
  const imgAlt = data.attributes.slideMainimage.data.attributes.name;
  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    data.attributes.slideMainimage.data.attributes.url;

  return (
    <>
      <Link
       href={`${redirectionUrl ? redirectionUrl : `${redirectionPage}${data.attributes.slug ? data.attributes.slug : ""}`}`}
       className="text-decoration-none"
       target={redirectionUrl ? "_blank" : "_self"} 
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
            {!isImplement ? (
              <>
                <ul>
                  <li>
                    <p>
                      {data.attributes.tractor_category.data.attributes.name}
                    </p>
                  </li>
                  <li>
                    <p>{data.attributes.tractorType}</p>
                  </li>
                  <li>
                    <div className="colors">
                      {data.attributes.colors.data.map(
                        (
                          color,
                          index // Mapping through colors
                        ) => (
                          <span
                            key={index}
                            className="color-swatch"
                            style={{
                              backgroundColor: color.attributes.colorCode,
                            }}
                          ></span>
                        )
                      )}
                    </div>
                  </li>
                </ul>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>
      </Link>
    </>
  );
};

export default Product;
