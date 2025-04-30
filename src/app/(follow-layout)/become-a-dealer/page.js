import DealerStats from "@/components/pages/become-a-dealer/DealerStats";
import HeroSection from "@/components/pages/become-a-dealer/HeroSection";
import Banner from "@/components/shared/Banner";
import InquiryForm from "@/components/shared/InquiryForm";
import { getBecomeADealerPageData } from "@/data/loaders";
import { findBlockByComponent } from "@/lib/utils";
import React from "react";
import { GET_BECOME_A_DEALER_PAGE_DATA } from "@/graphql/queries/become-a-dealer";
import { fetchData } from "@/lib/graphql-operations";
import FactSection from "@/components/pages/homepage/FactSection";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_BECOME_A_DEALER_PAGE_DATA);
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
  // const { data } = await getBecomeADealerPageData();
  // const bannerData = findBlockByComponent(data[0].blocks, 'block.common-header');
  // const { subText, heading: commonBannerHeading, coverImage, breadcrums } = bannerData;

  const graphqlData = await fetchData(GET_BECOME_A_DEALER_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks;
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData[0];
  const {
    TopTitle: title,
    Heading: heading,
    video,
    posterImage: posterImage,
    description,
  } = graphqlData.pages.data[0].attributes.blocks[1];
  const factsSectionAllData = graphqlData.pages.data[0].attributes.blocks[2];
  const {
    factsSectionTopTitle,
    factsSectionHeading,
    factsSectionDescription,
    factsSectionBackgroundImage,
    incorporationText,
    incorporationSubtext,
    turnoverText,
    turnoverSubtext,
    volumeText,
    volumeSubtext,
    researchFacilityText,
    researchFacilitySubext,
    countriesText,
    countriesSubText,
    dealersText,
    dealersSubtext,
    noOfTractorsText,
    noOfTractorsSubtext,
    otherFactText,
    otherFactSubtext
  } = factsSectionAllData;
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <HeroSection
        title={title}
        heading={heading}
        video={video}
        posterImage={posterImage}
        description={description}
      />
      <FactSection
        topTitle={factsSectionTopTitle}
        heading={factsSectionHeading}
        description={factsSectionDescription}
        backgroundImage={factsSectionBackgroundImage}
        incorporationText={incorporationText}
        incorporationSubtext={incorporationSubtext}
        turnoverText={turnoverText}
        turnoverSubtext={turnoverSubtext}
        volumeText={volumeText}
        volumeSubtext={volumeSubtext}
        researchFacilityText={researchFacilityText}
        researchFacilitySubext={researchFacilitySubext}
        countriesText={countriesText}
        countriesSubText={countriesSubText}
        dealersText={dealersText}
        dealersSubtext={dealersSubtext}
        noOfTractorsText={noOfTractorsText}
        noOfTractorsSubtext={noOfTractorsSubtext}
        otherFactText={otherFactText}
        otherFactSubtext={otherFactSubtext}
      />
      <InquiryForm formType="dealer" />
    </>
  );
};

export default page;
