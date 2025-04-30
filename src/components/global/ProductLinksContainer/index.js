import React from "react";
import ImplementsListings from "./ImplementsListings";
import ProductsListing from "./ProductsListing";

const ProductLinksContainer = ({ data }) => {
  data = data.data.attributes;
  const productHeading = data.productLinks.linksHeading1;
  const productBySeries = data.productLinks.tractorsBySeries;
  const tractorByModels = data.productLinks.tractorByModels;

  const implementHeading = data.productLinks.linksHeading2;
  const implementCategories = data.productLinks.implementsByCategory;
  const implementsNames = data.productLinks.implementByName;

  return (
    <>
      <section className="product-listing">
        <div className="container">
          <div className="row g-4">
            <ProductsListing
              sectionHeading={productHeading}
              productBySeries={productBySeries}
              tractorByModels={tractorByModels}
            />
            <ImplementsListings
              sectionHeading={implementHeading}
              implementCategories={implementCategories}
              implementsNames={implementsNames}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductLinksContainer;
