import React from "react";
import DomesticNetworkContainer from "@/components/pages/domestic-network/DomesticNetworkContainer";
import Banner from "@/components/shared/Banner";
import InquiryForm from "@/components/shared/InquiryForm";

import { GET_DOMESTIC_NETWORK_PAGE_DATA } from "@/graphql/queries/domestic-network";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_DOMESTIC_NETWORK_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_DOMESTIC_NETWORK_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <DomesticNetworkContainer />
      <InquiryForm formType="Domestic" />
    </>
  );
};

export default page;
