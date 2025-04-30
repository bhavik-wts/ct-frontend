import React from "react";
import Banner from "@/components/shared/Banner";
import InquiryForm from "@/components/shared/InquiryForm";
import InternationalNetworkContainer from "@/components/pages/international-network/InternationalNetworkContainer";
import { fetchData } from "@/lib/graphql-operations";
import { GET_INTERNATIONAL_NETWORK_DATA } from "@/graphql/queries/international-network";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_INTERNATIONAL_NETWORK_DATA);
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
  const graphqlData = await fetchData(GET_INTERNATIONAL_NETWORK_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];

  const {
    subText,
    heading: commonBannerHeading,
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
      <InternationalNetworkContainer />
      <InquiryForm formType="International" />
    </>
  );
};

export default page;
