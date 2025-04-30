import InquiryForm from "@/components/pages/inquiry/InquiryForm";
import Banner from "@/components/shared/Banner";
import { GET_INQUIRY_PAGE_DATA } from "@/graphql/queries/inquiry";
import { fetchData } from "@/lib/graphql-operations";
import React from "react";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_INQUIRY_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_INQUIRY_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];

  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  // console.log(bannerData);

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <InquiryForm />
    </>
  );
};

export default page;
