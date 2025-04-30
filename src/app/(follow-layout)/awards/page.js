import AwardsSlider from "@/components/pages/awards/AwardsSlider";
import Banner from "@/components/shared/Banner";
import { GET_AWARDS_PAGE_DATA } from "@/graphql/queries/awards";
import { fetchData } from "@/lib/graphql-operations";

import React from "react";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_AWARDS_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_AWARDS_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    heading: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;
  const sliderData =
    graphqlData.pages.data[0].attributes.blocks[1].BannerDetail;

  // console.log("commonBannerHeading", commonBannerHeading);
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <AwardsSlider data={sliderData} />
    </>
  );
};

export default page;
