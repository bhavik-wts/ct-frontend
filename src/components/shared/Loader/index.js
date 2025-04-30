"use client"
import Lottie from "lottie-react";
import React from "react";
import loader from "../../../../public/images/LOADER.json"

const Loader = () => {
  return (
    <div className="loader-center">
      {/* <img src="/images/tracktor_loader.png" alt="tractor-aa" /> */}
      <Lottie animationData={loader} loop={true} style={{ width: 200 }} />

      {/* <div className="loading">
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
      </div> */}
    </div>
  );
};

export default Loader;
