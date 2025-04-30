import MilestoneWiseJourney from "@/components/pages/company-history/MilestoneWiseJourney";
import Banner from "@/components/shared/Banner";
import React from "react";
import { GET_COMPANY_HISTORY_PAGE_DATA } from "@/graphql/queries/company-history";
import { fetchData } from "@/lib/graphql-operations";
import HeroSection from "@/components/pages/become-a-dealer/HeroSection";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_COMPANY_HISTORY_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_COMPANY_HISTORY_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;
  const videoBannerDetails = graphqlData.pages.data[0].attributes.blocks[1];
  // console.log("video banner", videoBannerDetails);

  const timeineAllData = graphqlData.pages.data[0].attributes.blocks[2];
  // console.log("timeineAllData", timeineAllData);
  const { topTitle: timelineTopTitle, heading: timelineHeading, backgroungImage } = timeineAllData;
  const {
    TopTitle: title,
    Heading: heading,
    posterImage,
    description,
    video,
  } = videoBannerDetails;
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />

      {/* used hero section from become a dealer page as both are same */}
      <HeroSection
        title={title}
        heading={heading}
        video={video}
        posterImage={posterImage}
        description={description}
      />
      <MilestoneWiseJourney topTitle={timelineTopTitle} heading={timelineHeading} backgroungImage={backgroungImage} />
    </>
  );
};

export default page;
