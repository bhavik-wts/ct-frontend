"use client";
import Tabs from "@/components/global/Header/MegaMenu/components/Tabs";
import React, { useState, useEffect } from "react";
import SpecCard from "./SpecCard";

const ProductSpecs = ({ subText, heading, specs }) => {
  const [selectedTab, setSelectedTab] = useState(specs?.[0]?.title || "");
  const [details, setDetails] = useState(specs?.[0]?.typeDetail || []);

  // Fallback for cases where data is missing
  const selectedSpec = specs?.find((spec) => spec.title === selectedTab);
  const imgUrl = selectedSpec?.image?.data?.attributes?.url
    ? process.env.NEXT_PUBLIC_STRAPI_URL +
      selectedSpec.image.data.attributes.url
    : "/images/default-image.png"; // Default image if not available
  const alt = selectedSpec?.image?.data?.attributes?.name || "Default Alt Text";

  useEffect(() => {
    if (selectedTab) {
      const specDetails =
        specs?.find((spec) => spec.title === selectedTab)?.typeDetail || [];
      setDetails(specDetails);
    }
  }, [selectedTab, specs]);

  if (!specs || specs.length === 0) {
    return null; // Handle case where specs is empty or undefined
  }

  return (
    <section className="engine py-80">
      <div className="container">
        <div className="row justify-content-center g-4">
          <div className="col-md-8 col-lg-12 col-xl-6 text-center">
            <img src={imgUrl} alt={alt} className="engine-img" />
          </div>
          <div className="col-md-12 col-lg-12 col-xl-6">
            <div className="section-title">
              <h3>{subText || "Default SubText"}</h3>
              <h2>{heading || "Default Heading"}</h2>
            </div>
            <ul className="nav nav-tabs">
              {specs.map((spec, index) => (
                <Tabs
                  key={index}
                  name={spec.title || "Untitled Spec"}
                  isSelected={selectedTab === spec.title}
                  setSeletion={setSelectedTab}
                />
              ))}
            </ul>
            <div className="tab-content">
              <div className="row g-4">
                {details.map((detail, index) => (
                  <SpecCard
                    key={index}
                    title={detail?.title || "Untitled"}
                    value={detail?.value || "No value available"}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSpecs;
