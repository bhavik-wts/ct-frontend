import React from "react";
import DealerCard from "./DealerCard";

const DealerContainer = ({ data }) => {
  return (
    <>
      <div className="row g-4">
        {data.map((dealer, index) => (
          <DealerCard data={dealer} key={index} />
        ))}
      </div>
    </>
  );
};

export default DealerContainer;
