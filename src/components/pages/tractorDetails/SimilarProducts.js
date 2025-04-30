import React from "react";
import SimilarProductCard from "./SimilarProductCard";

const SimilarProducts = ({ data }) => {
  data = data.map((item) => item.attributes);
  // console.log("data111", data);
  return (
    <>
      <section className="product py-80">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-title text-center">
                <h3>Similar Product</h3>
                <h2>You may also Like</h2>
              </div>
            </div>
          </div>
          <div className="row g-4 justify-content-center">
            {data &&
              data.map((tractor, index) => (
                <SimilarProductCard data={tractor} key={index} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SimilarProducts;
