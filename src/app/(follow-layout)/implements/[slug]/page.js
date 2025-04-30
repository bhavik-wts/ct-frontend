"use client";
import React, { useState, useEffect } from "react";
import ImplementHero from "@/components/pages/implementDetails/ImplementHero";
import ImplementSlider from "@/components/pages/implementDetails/ImplementSlider";
import ImplementSpecs from "@/components/pages/implementDetails/ImplementSpecs";
import Banner from "@/components/shared/Banner";
import ContactForm from "@/components/shared/ContactForm";
import DownloadBanner from "@/components/shared/DownloadBanner";
import { GET_IMPLEMENTS_DETAILS_PAGE_DATA } from "@/graphql/queries/implement-details";
import { GET_IMPLEMENT_BY_SLUG } from "@/graphql/queries/get-implement-by-slug";
import { fetchData } from "@/lib/graphql-operations";
import { GET_OTHER_IMPLEMENTS } from "@/graphql/queries/get-other-implements";
import { usePathname } from "next/navigation";

import Loader from "@/components/shared/Loader";

const Page = ({ params }) => {
  const { slug } = params; // Get the slug from params
  const currentPathName = usePathname();

  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [data, setData] = useState(null); // Data state

  useEffect(() => {
    document.title = `Implement | ${currentPathName
      .split("/")[2]
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ")}`;
  }, [currentPathName]);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        // Fetch data for blog details
        const graphqlDetailData = await fetchData(
          GET_IMPLEMENTS_DETAILS_PAGE_DATA
        );
        // console.log("graphqlDetailData", graphqlDetailData);
        const bannerData = graphqlDetailData.pages.data[0].attributes.blocks[0];
        const {
          subText,
          headingAlias: commonBannerHeading,
          coverImage,
          breadcrums,
        } = bannerData;
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

        const graphqlSlugData = await fetchData(GET_IMPLEMENT_BY_SLUG, {
          slug,
        });
        // console.log("graphqlSlugData1", graphqlSlugData);
        const implementsData = graphqlSlugData.implements.data[0];
        const {
          specificationTitle,
          specificationMainTitle,
          length,
          width,
          height,
          approxWeight,
          workingWidth,
          workingDepth,
          powerReruirement,
        } = implementsData.attributes;
        const otherImplementsData = await fetchData(GET_OTHER_IMPLEMENTS, {
          categoryName:
            implementsData.attributes.implement_category.data.attributes.name,
        });

        let updateBreadcrums = [...breadcrums];
        const implementCategory =
          implementsData.attributes.implement_category.data.attributes.name;
        const implementName = implementsData.attributes.name;

        updateBreadcrums.push({
          id: String(Math.random()),
          title: implementCategory,
          link: "/implements",
        });

        updateBreadcrums.push({
          id: String(Math.random()),
          title: implementName,
          link: currentPathName,
        });

        // Set the data state
        setData({
          bannerData: {
            subText: implementCategory,
            heading: implementName,
            coverImage,
            breadcrums: updateBreadcrums,
          },
          implementsData,
          downloadBannerData: {
            toptitle,
            heading,
            description,
            Buttonlabel,
            buttonlink,
            backgroundimage,
          },
          specifications: {
            specificationTitle,
            specificationMainTitle,
            allSpecs: [
              { label: "Length", value: length || null },
              { label: "Width", value: width || null },
              { label: "Height", value: height || null },
              { label: "Approx Weight", value: approxWeight || null },
              { label: "Working Width", value: workingWidth || null },
              { label: "Working Depth", value: workingDepth || null },
              { label: "Power Reruirement", value: powerReruirement || null },
            ],
          },
          otherTractors: otherImplementsData.implements.data,
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
    downloadBannerData,
    specifications,
    otherTractors,
    implementsData,
  } = data;

  return (
    <>
      <Banner {...bannerData} />
      <ImplementHero data={implementsData} />
      <ImplementSpecs {...specifications} />
      <DownloadBanner {...downloadBannerData} />
      <ContactForm type="Implement" />
      <ImplementSlider title={bannerData.subText} data={otherTractors} />
    </>
  );
};

export default Page;
