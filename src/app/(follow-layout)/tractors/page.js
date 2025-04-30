"use client";
import ProductsTabs from "@/components/pages/tractors/ProductsTabs";
import ProductShowcase from "@/components/shared/ProductShowcase";
import Banner from "@/components/shared/Banner";
import ProductSlider from "@/components/shared/ProductSlider";
import React, { useState, useEffect } from "react";
import { GET_TRACTOR_LISTING_PAGE } from "@/graphql/queries/get-tractor-lising-page";
import { fetchData } from "@/lib/graphql-operations";
import Loader from "@/components/shared/Loader";

const Page = () => {
  const [tractorType, setTractorType] = useState("Domestic");
  const [graphqlData, setGraphqlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredTractors, setFilteredTractors] = useState([]); // New state for filtered tractors

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

  // useEffect(() => {
  //   const hash = window.location.hash;
  //   if (hash) {

  //     const targetElement = document.getElementById(hash.slice(1));

  //     if (targetElement) {
  //       window.scroll(0, targetElement.getClientRects().top);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchData(GET_TRACTOR_LISTING_PAGE);
        setGraphqlData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  useEffect(() => {
    if (!graphqlData) return;
    if (graphqlData.tractorCategorywiseData.data) {
      const filterTractorsByTypeAndCategory = (type) => {
        let filteredData = [];
        graphqlData.tractorCategorywiseData.data.forEach((category) => {
          const filteredTractors = category.attributes.tractors.data.filter(
            (tractor) => tractor.attributes.modelType === type
          );
          if (filteredTractors.length > 0) {
            filteredData.push({
              ...category,
              attributes: {
                ...category.attributes,
                tractors: {
                  ...category.attributes.tractors,
                  data: filteredTractors,
                },
              },
            });
          }
        });
        return filteredData;
      };

      const tractors = tractorType
        ? filterTractorsByTypeAndCategory(tractorType)
        : graphqlData.data; // Default to all data if no type
      setFilteredTractors(tractors); // Set the filtered tractors state
      // console.log("Filtered Tractors:", tractors); // Log the filtered data
    }
  }, [tractorType, graphqlData]);

  if (loading) return <Loader />;
  if (error) return <div className="error">Error: {error}</div>;

  const bannerData = graphqlData?.pages?.data?.[0]?.attributes?.blocks?.[0]; // Use optional chaining
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData || {};
  const productData = graphqlData?.tractorCategorywiseData?.length
    ? graphqlData.tractorCategorywiseData
    : []; // Ensure it's defined
  // console.log("filtered tractor", filteredTractors);
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <ProductsTabs setTractorType={setTractorType} />
      {filteredTractors &&
        filteredTractors.map((category, index) => {
          const isWhite = index % 2 === 0; // Determine if the section should be white
          const tractorsData = category.attributes?.tractors?.data;

          return (
            <div
              id={
                category.attributes.name
                  .toLowerCase() // Convert to lowercase
                  .trim() // Remove any leading or trailing spaces
                  .replace(/\s+/g, "-") // Replace all spaces with underscores
              }
              key={category.attributes.name}
              style={{ backgroundColor: isWhite ? "white" : "lightgray" }}
            >
              {tractorsData?.length <= 2 ? (
                <ProductShowcase
                  isWhite={isWhite}
                  name={category.attributes.name}
                  data={tractorsData}
                />
              ) : tractorsData?.length >= 3 ? (
                <ProductSlider
                  seriesName={category.attributes.name}
                  isWhite={isWhite}
                  data={tractorsData}
                  type="details-page-tractors-slider"
                />
              ) : null}{" "}
              {/* Render nothing if length is 0 or 2 */}
            </div>
          );
        })}
    </>
  );
};

export default Page;
