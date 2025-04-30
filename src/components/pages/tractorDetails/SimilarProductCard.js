import Link from "next/link";
import React from "react";

const SimilarProductCard = ({ data }) => {
  // console.log("\n\n\nproductcarddata", data);
  const imgUrl =
    process.env.NEXT_PUBLIC_STRAPI_URL +
    data.slideMainimage?.data?.attributes?.url;
  return (
    <div className="col-md-6 col-lg-4">
      <Link href={`/tractors/${data.slug}`} className="text-decoration-none">
        <div className="product-block">
          <div className="product-image">
            {/* Use dynamic image source if available */}
            <img
              src={imgUrl || "/images/product-tractor-1.png"}
              alt={data.name}
            />
          </div>
          <div className="product-content">
            <h6>{data.name}</h6>
            <ul>
              <li>
                <p>
                  {data.tractor_category?.data?.attributes?.name &&
                    (() => {
                      const name =
                        data.tractor_category?.data?.attributes?.name;

                      if (
                        name.toLowerCase().includes("below 30 hp tractors") ||
                        name.toLowerCase().includes("above 30 hp tractors")
                      ) {
                        return name.split(" ").slice(0, 3).join(" ");
                      } else {
                        return name.split(" ").slice(0, 2).join(" ");
                      }
                    })()}
                </p>
              </li>
              {data.tractorType && (
                <li>
                  <p>{data.tractorType}</p>
                </li>
              )}

              {data.colors.data.length > 0 && (
                <li>
                  <div className="colors">
                    {data.colors?.data?.map((color, index) => (
                      <span
                        key={index}
                        className={color.attributes.colorName.toLowerCase()}
                      ></span>
                    ))}
                  </div>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SimilarProductCard;
