import Lottie from "lottie-react";
import React from "react";
import loader from "../../../../../public/images/LOADER.json"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <div className="loader-center">
      {/* <img src="/images/tracktor_loader.png" alt="tractor" /> */}
      <Lottie animationData={loader} loop={true} style={{ width: 200 }} />
      {/* <div className="loading">
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
        <span className="loading__dot"></span>
      </div> */}
    </div>
  );
}
