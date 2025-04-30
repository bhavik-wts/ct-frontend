import Product from "@/components/shared/ProductSlider/Product";
import React from "react";

const ProductShowcase = ({ name, data, isWhite, isImplementPage }) => {
  console.log("data in single", name);

  return (
    <>
      <section
        className={`feature py-80 pb-5 ${isWhite ? "bg-white" : ""}`}
        id="22hp"
      >
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12">
              <div className="section-title">
                {isImplementPage ? (
                  <h3>Featured Implements</h3>
                ) : (
                  <h3>Featured Tractors</h3>
                )}
                <h2>{name}</h2>
              </div>
            </div>
          </div>
          <div className="row justify-content-center">
            {data.map((productData, index) => (
              <div className="col-md-6" key={index}>
                <Product
                  data={productData}
                  isWhite={isWhite}
                  isImplement={isImplementPage}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductShowcase;
