"use client";
import React, { useState, useEffect } from "react";
import ProductFeatures from "@/components/pages/tractorDetails/ProductFeatures";
import ProductHero from "@/components/pages/tractorDetails/ProductHero";
import ProductSpecs from "@/components/pages/tractorDetails/ProductSpecs";
import SimilarProducts from "@/components/pages/tractorDetails/SimilarProducts";
import Banner from "@/components/shared/Banner";
import ContactForm from "@/components/shared/ContactForm";
import DownloadBanner from "@/components/shared/DownloadBanner";
import { getTractorDetailBannerData } from "@/data/loaders";
import { findBlockByComponent } from "@/lib/utils";
import Loader from "@/components/shared/Loader";

import { GET_TRACTOR_DETAILS_PAGE_DATA } from "@/graphql/queries/tractor-details"; // Existing query
import { GET_TRACTOR_BY_SLUG } from "@/graphql/queries/get-tractor-by-slug"; // New query for blog by slug
import { fetchData } from "@/lib/graphql-operations";
import { usePathname } from "next/navigation";
import Head from "next/head";
import { GET_TRACTOR_CATEGORIES_LIST } from "@/graphql/queries/get-tractor-categories-list";

const Page = ({ params }) => {
  const { slug } = params; // Get the slug from params
  const currentPathName = usePathname();
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [data, setData] = useState(null); // Data state

  useEffect(() => {
    // const hash = typeof window !== "undefined" ? window.location.hash : null;
    document.title = `Tractor | ${currentPathName
      .split("/")[2]
      .split("-")
      .reduce((acc, part, index, arr) => {
        // If the part is 'wd' and the previous part is a number, combine them as "4WD", "2WD", etc.
        if (
          part.toLowerCase() === "wd" &&
          index > 0 &&
          !isNaN(arr[index - 1])
        ) {
          acc[acc.length - 1] += "WD"; // Combine number with 'WD'
        } else {
          // Capitalize the first letter and convert the rest to uppercase
          acc.push(part.toUpperCase());
        }
        return acc;
      }, [])
      .join(" ")}`;
  }, [currentPathName]);

  useEffect(() => {
    setLoading(true); // Ensure loading starts before fetching
    const fetchDataAsync = async () => {
      try {
        const graphqlSlugData = await fetchData(GET_TRACTOR_BY_SLUG, { slug });
        const tractorData = graphqlSlugData.tractors.data[0];
        const { tractor_category, type } = tractorData.attributes;

        const tractorCategoryName =
          tractor_category?.data?.attributes?.name || "Default Category";

        // Get the list of all categories
        const graphqlCategoriesData = await fetchData(
          GET_TRACTOR_CATEGORIES_LIST,
          {
            modelType: type,
          }
        );
        const allCategories = graphqlCategoriesData.tractorCategories.data.map(
          (category) => category.attributes.name
        );

        // Find the current category index in the list of categories
        const currentCategoryIndex = allCategories.indexOf(tractorCategoryName);

        if (currentCategoryIndex === -1) {
          throw new Error(`Category "${tractorCategoryName}" not found.`);
        }

        const fetchTractorsByCategory = async (categoryName) => {
          const graphqlDetailData = await fetchData(
            GET_TRACTOR_DETAILS_PAGE_DATA,
            {
              categoryName,
            }
          );
          return graphqlDetailData.tractors.data.filter(
            (tractor) => tractor.attributes.slug !== slug
          );
        };

        let otherTractors = [];
        let remainingCount = 3;

        // Step 1: Fetch 2 tractors from the current category
        const currentCategoryTractors = await fetchTractorsByCategory(
          allCategories[currentCategoryIndex]
        );
        otherTractors = currentCategoryTractors.slice(0, 2);
        remainingCount -= otherTractors.length;

        // Step 2: Fetch 1 tractor from the next category if needed
        let nextCategoryIndex = currentCategoryIndex + 1;
        while (remainingCount > 0 && nextCategoryIndex < allCategories.length) {
          const nextCategoryTractors = await fetchTractorsByCategory(
            allCategories[nextCategoryIndex]
          );

          const tractorsToAdd = nextCategoryTractors.slice(0, remainingCount);
          otherTractors = [...otherTractors, ...tractorsToAdd];
          remainingCount -= tractorsToAdd.length;

          nextCategoryIndex++;
        }

        // Step 3: If still fewer than 3 tractors, keep looking further categories
        while (remainingCount > 0 && nextCategoryIndex < allCategories.length) {
          const additionalCategoryTractors = await fetchTractorsByCategory(
            allCategories[nextCategoryIndex]
          );

          const tractorsToAdd = additionalCategoryTractors.slice(
            0,
            remainingCount
          );
          otherTractors = [...otherTractors, ...tractorsToAdd];
          remainingCount -= tractorsToAdd.length;

          nextCategoryIndex++;
        }

        // Ensure exactly 3 tractors in the result
        otherTractors = otherTractors.slice(0, 3);

        // Fetch the other necessary details as before
        const graphqlDetailData = await fetchData(
          GET_TRACTOR_DETAILS_PAGE_DATA,
          {
            categoryName: tractorCategoryName,
          }
        );

        const bannerData = graphqlDetailData.pages.data[0].attributes.blocks[0];
        const {
          subText,
          headingAlias: commonBannerHeading,
          coverImage,
          breadcrums,
        } = bannerData;
        // console.log("commonBannerHeading", commonBannerHeading);

        // console.log("tractorData all", tractorData);
        const {
          YoutubeLink: videoLinks,
          colormedia,
          commonblocks: tractorDataCommonBlock,
          name,
          description: productDescription,
        } = tractorData.attributes;
        // console.log("tractorData.attributes-------", tractorData.attributes);
        const {
          specificationTopTitle,
          specificationMainTitle,
          specification: specifications,
          slug: tractorSlug,
        } = tractorData.attributes;

        const downloadBannerData =
          graphqlDetailData.pages.data[0].attributes.blocks[1];
        const {
          toptitle,
          heading,
          description,
          Buttonlabel,
          buttonlink,
          backgroundimage,
        } = downloadBannerData;

        const featureData =
          graphqlSlugData.tractors.data[0].attributes.commonblocks[1];
        // const otherTractors = graphqlDetailData.tractors.data;

        let updateBreadcrums = [...breadcrums];
        const tractorCategory =
          tractorData.attributes.tractor_category.data.attributes.name;
        const tractorName = tractorData.attributes.name;

        updateBreadcrums.push({
          id: String(Math.random()),
          title: tractorCategory,
          link: `/tractors/#${
            tractorCategory
              .toLowerCase() // Convert to lowercase
              .trim() // Remove any leading or trailing spaces
              .replace(/\s+/g, "-") // Replace all spaces with underscores
          }`,
        });

        updateBreadcrums.push({
          id: String(Math.random()),
          title: tractorName,
          link: currentPathName,
        });

        setData({
          bannerData: {
            subText: tractorCategory,
            heading: tractorName,
            coverImage,
            breadcrums: updateBreadcrums,
          },
          productHeroData: {
            name,
            description: productDescription,
            categoryName: tractor_category.data.attributes.name,
            tractorSlides: tractorDataCommonBlock[0]?.modelSlider,
            colorMedia: colormedia,
            videoLinks,
            slug: tractorSlug,
          },
          featureData,
          downloadBannerData: {
            toptitle,
            heading,
            description,
            Buttonlabel,
            buttonlink,
            backgroundimage,
          },
          specifications: {
            specificationTopTitle,
            specificationMainTitle,
            specifications,
          },
          otherTractors,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error loading data. Please try again later.");
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchDataAsync();
  }, [slug]);

  if (loading) return <Loader />; // Show loader while loading
  if (error) return <div>{error}</div>; // Show error message if there's an error

  // Ensure data is defined before destructuring
  if (!data) {
    return <div>No data available.</div>; // Fallback if data is still undefined
  }

  // Destructure data for rendering
  const {
    bannerData,
    featureData,
    downloadBannerData,
    specifications,
    otherTractors,
    productHeroData,
  } = data;

  console.log("otherTractors", otherTractors);

  return (
    <>
      <Banner {...bannerData} />
      <ProductHero {...productHeroData} />
      <ProductFeatures data={featureData} />
      <DownloadBanner {...downloadBannerData} />
      <ProductSpecs
        subText={specifications.specificationTopTitle}
        heading={specifications.specificationMainTitle}
        specs={specifications.specifications}
      />
      <ContactForm type="Tractors" />
      <SimilarProducts data={otherTractors} />
    </>
  );
};

export default Page;
