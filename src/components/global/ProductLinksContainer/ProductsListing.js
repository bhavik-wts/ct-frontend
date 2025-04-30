import Link from "next/link";
import React from "react";

const ProductsListing = ({
  sectionHeading,
  productBySeries,
  tractorByModels,
}) => {
  const productSeriesHeading = productBySeries.heading;
  const productSeries = productBySeries.bySeries.data;
  const productModelHeading = tractorByModels.heading;
  const allProducts = tractorByModels.tractors.data;
  return (
    <>
      <div className="col-md-6 col-xl-4">
        <h6>{sectionHeading}</h6>
        <div className="row g-3">
          <div className="col-md-6">
            <span>{productSeriesHeading}</span>
            <ul>
              {productSeries &&
                productSeries.map((series) => (
                  <li key={series.attributes.slug}>
                    <Link href={series.attributes.link}>{series.attributes.name}</Link>
                  </li>
                ))}
            </ul>
          </div>
          <div className="col-md-6">
            <span>{productModelHeading}</span>
            <ul>
              {allProducts.map((product) => (
                <li key={product.attributes.slug}>
                  <Link href={`/tractors/${product.attributes.slug}`}>{product.attributes.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsListing;
