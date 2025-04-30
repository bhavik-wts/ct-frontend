"use client";
import React, { useRef, useEffect, useState } from "react";
import Slider from "@/components/shared/Slider";

const ProductSlider = ({ isWhite, data, type, seriesName }) => {
  const sliderRef = useRef(null);

  // remove this in future this is a fix for
  // slider library causing issue when slideToShow  is less and loop is true
  if (data && data.length <= 4) {
    data = [...data, ...data];
  }

  const handlePrevClick = () => {
    if (sliderRef.current) {
      sliderRef.current.prev(); // Trigger previous slide
    }
  };

  const handleNextClick = () => {
    if (sliderRef.current) {
      sliderRef.current.next(); // Trigger next slide
    }
  };

  console.log("typeee", type);

  // console.log("data in product slider", data);
  return (
    <section className={`feature py-80 ${isWhite ? "bg-white" : ""}`}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="section-title">
              <h3>
                Featured{" "}
                {type === "details-page-tractors-slider"
                  ? "Tractors"
                  : "Implements"}
              </h3>
              <h2>{seriesName}</h2>
            </div>
          </div>
          <div className="col-md-4">
            <div className="text-md-end text-left d-none d-md-block">
              <button onClick={handlePrevClick} className="custom-prev">
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.279759 6.68472C0.279759 6.68472 0.280238 6.6852 0.280713 6.68568L5.25685 11.7182C5.6297 12.0952 6.23255 12.0938 6.60398 11.7149C6.97493 11.336 6.9735 10.7233 6.60064 10.3464L3.25973 6.9678L21.0476 6.9678C21.5738 6.9678 22 6.53471 22 6C22 5.46529 21.5738 5.0322 21.0476 5.0322L3.25925 5.0322L6.60017 1.65361C6.97302 1.27665 6.97445 0.664034 6.6035 0.28514C6.23255 -0.0937542 5.62923 -0.0952067 5.25637 0.281752L0.280236 5.31431C0.280236 5.31431 0.279759 5.3148 0.279284 5.31528C-0.0935702 5.69369 -0.0926184 6.30824 0.279284 6.6852L0.279759 6.68472Z"
                    fill="#201E1E"
                  />
                </svg>
              </button>
              <button onClick={handleNextClick} className="custom-next">
                <svg
                  width="22"
                  height="12"
                  viewBox="0 0 22 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21.7202 5.31528C21.7202 5.31528 21.7198 5.3148 21.7193 5.31431L16.7432 0.281754C16.3703 -0.0952044 15.7674 -0.0937527 15.396 0.285141C15.0251 0.664035 15.0265 1.27665 15.3994 1.65361L18.7403 5.0322L0.952371 5.0322C0.426186 5.0322 0 5.46529 0 6C0 6.53471 0.426186 6.9678 0.952371 6.9678L18.7407 6.9678L15.3998 10.3464C15.027 10.7233 15.0256 11.336 15.3965 11.7149C15.7674 12.0938 16.3708 12.0952 16.7436 11.7182L21.7198 6.68569C21.7198 6.68569 21.7202 6.6852 21.7207 6.68472C22.0936 6.30631 22.0926 5.69176 21.7207 5.3148L21.7202 5.31528Z"
                    fill="#201E1E"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <div className="center product-slider">
              <Slider
                isWhite={isWhite}
                ref={sliderRef}
                type={type}
                data={data}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSlider;
