"use client";
import Banner from "@/components/shared/Banner";
import ProductSlider from "@/components/shared/ProductSlider";
import React, { useState, useEffect } from "react";
import { GET_IMPLEMENT_LISTING_PAGE } from "@/graphql/queries/get-implement-listing-page";
import { fetchData } from "@/lib/graphql-operations";
import Loader from "@/components/shared/Loader";
import ProductShowcase from "@/components/shared/ProductShowcase";

const Page = () => {
  const [graphqlData, setGraphqlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Ensure the logic runs only after the page has been rendered
    const hash = window.location.hash;

    if (hash) {
      const hashId = hash.replace("#", "");
      console.log("hashId", hashId);

      // Delay slightly to ensure the DOM is fully rendered
      setTimeout(() => {
        const element = document.getElementById(hashId);
        console.log("element", element);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 500);
    }
  }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(GET_IMPLEMENT_LISTING_PAGE);
        setGraphqlData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const renderImplements = () => {
    if (!graphqlData?.implementCategorywiseData?.data?.length) {
      return <h1>No implements available</h1>;
    }

    // const allImplements = graphqlData.implementCategorywiseData.data.flatMap(
    //   (implementCategory) => implementCategory.attributes.implements.data
    // );
    console.log("allImplements", graphqlData?.implementCategorywiseData?.data);

    return graphqlData?.implementCategorywiseData?.data.map(
      (implement, index) => {
        const isWhite = index % 2 === 0; // Determine if the section should be white

        if (implement.attributes.implements.data.length <= 2) {
          return (
            <div
              id={
                implement.attributes.name
                  .toLowerCase() // Convert to lowercase
                  .trim() // Remove any leading or trailing spaces
                  .replace(/[\s/]+/g, "-") // Replace all spaces with underscores
              }
              key={index}
            >
              <ProductShowcase
                name={implement.attributes.name}
                isImplementPage={true}
                isWhite={isWhite}
                data={implement.attributes.implements.data}
              />
            </div>
          );
        } else if (implement.attributes.implements.data.length >= 3) {
          return (
            <div
              id={
                implement.attributes.name
                  .toLowerCase() // Convert to lowercase
                  .trim() // Remove any leading or trailing spaces
                  .replace(/[\s/]+/g, "-") // Replace all spaces with underscores
              }
              key={index}
            >
              <ProductSlider
                seriesName={implement.attributes.name}
                isWhite={isWhite}
                data={implement.attributes?.implements?.data}
                type="details-page-implement-slider"
              />
            </div>
          );
        }
        return null; // In case there's no matching condition
      }
    );
  };

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;

  const bannerData = graphqlData?.pages?.data?.[0]?.attributes?.blocks?.[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData || {};

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      {renderImplements()}
    </>
  );
};

export default Page;
