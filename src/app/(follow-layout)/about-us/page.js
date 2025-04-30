import AboutUsContainer from "@/components/pages/about-us/AboutUsContainer";
import BoardOfDirector from "@/components/pages/about-us/BoardOfDirector";
import DirectorsMessage from "@/components/pages/about-us/DirectorsMessage";
import MembershipContainer from "@/components/pages/about-us/MembershipContainer";
import VisionMissionContainer from "@/components/pages/about-us/VisionMissionContainer";
import BoardMemberSlider from "@/components/pages/Careers/BoardMemberSlider";
import Banner from "@/components/shared/Banner";
import DownloadBanner from "@/components/shared/DownloadBanner";
import React from "react";
import { GET_ABOUT_US_PAGE_DATA } from "@/graphql/queries/about-us";
import { fetchData } from "@/lib/graphql-operations";
import Loader from "@/components/shared/Loader";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_ABOUT_US_PAGE_DATA);
  const seoData = await graphqlData.pages.data[0].attributes.Seo;

  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    openGraph: {
      images: [
        process.env.NEXT_PUBLIC_STRAPI_URL +
        seoData.metaImage.data.attributes.formats.medium.url,
      ],
    },
  };
}

const page = async () => {
  const graphqlData = await fetchData(GET_ABOUT_US_PAGE_DATA);

  const bannerData = graphqlData.pages.data[0].attributes.blocks[0]; //banner data
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const imageBanner = graphqlData.pages.data[0].attributes.blocks[1]; //imageBanner data top section
  const { BannerTitle, Banner: BannerImageData } = imageBanner;

  const boardMemberSliderDetails =
    graphqlData.pages.data[0].attributes.blocks[2]; // board member carousel
  const {
    TopTitle: boardMemberSliderTitle,
    Heading: boardMemberHeading,
    description: boardMemberSliderDescription,
    SliderType: boardMemberSliderType,
    TeamDetail: boardMemberTeamDetails,
  } = boardMemberSliderDetails;

  const boardMemberSliderData = {
    subHeading: boardMemberSliderTitle,
    heading: boardMemberHeading,
    description: boardMemberSliderDescription,
    data: boardMemberTeamDetails,
    sliderType: boardMemberSliderType,
  };

  const teamMemberSliderDetails =
    graphqlData.pages.data[0].attributes.blocks[3]; // team member carousel
  const {
    TopTitle: teamMemberSliderTitle,
    Heading: teamMemberHeading,
    description: teamMemberSliderDescription,
    SliderType: teamMemberSliderType,
    TeamDetail: teamMemberTeamDetails,
  } = teamMemberSliderDetails; // Extract team member details

  const teamMemberSliderData = {
    subHeading: teamMemberSliderTitle,
    heading: teamMemberHeading,
    description: teamMemberSliderDescription,
    data: teamMemberTeamDetails,
    sliderType: teamMemberSliderType,
    bgWhite: true,
  };

  const downloadBannerData = graphqlData.pages.data[0].attributes.blocks[3]; // downloadBannerData member carousel

  // console.log("downloadBannerData", downloadBannerData);

  const {
    toptitle,
    heading,
    description,
    Buttonlabel,
    buttonlink,
    backgroundimage,
  } = downloadBannerData;

  // console.log("graphql data", graphqlData.pages.data[0].attributes);

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <BoardOfDirector
        title={BannerTitle}
        imgUrl={BannerImageData.data.attributes.url}
      />
      <AboutUsContainer />
      <VisionMissionContainer />
      <DirectorsMessage />
      <BoardMemberSlider {...boardMemberSliderData} />
      {/* <BoardMemberSlider {...teamMemberSliderData} /> */}
      <DownloadBanner
        toptitle={toptitle}
        heading={heading}
        description={description}
        Buttonlabel={Buttonlabel}
        buttonlink={buttonlink}
        backgroundimage={backgroundimage}
      />
      <MembershipContainer />
    </>
  );
};

export default page;
