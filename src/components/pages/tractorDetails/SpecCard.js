import React from "react";

const SpecCard = ({ title, value }) => {
  return (
    <div className="col-sm-6 col-lg-4 col-xl-4">
      <div className="spec-block">
        <span>{title}</span>
        <h6>{value}</h6>
      </div>
    </div>
  );
};

export default SpecCard;
