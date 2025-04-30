import DealerStats from "@/components/pages/become-a-dealer/DealerStats";
import HeroSection from "@/components/pages/become-a-dealer/HeroSection";
import { SupplierSection } from "@/components/pages/become-a-supplier/SupplierSection";
import Banner from "@/components/shared/Banner";
import { GET_BECOME_A_SUPPLIER_PAGE_DATA } from "@/graphql/queries/become-a-supplier";
import { fetchData } from "@/lib/graphql-operations";
import React from "react";
// import { ApolloProvider } from '@apollo/client';
// import client from "@/lib/apollo-client";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_BECOME_A_SUPPLIER_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_BECOME_A_SUPPLIER_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks;
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData[0];

  const inquiryheadingBlock = graphqlData.pages.data[0].attributes.blocks[1];
  const { toptitle: title, heading, description } = inquiryheadingBlock;

  // const { data } = await getBecomeASupplierPageData();
  // const bannerData = findBlockByComponent(data[0].blocks, 'block.common-header');
  // const supplierFormContent = findBlockByComponent(data[0].blocks, 'block.inquiryheading');
  // const { subText, heading: commonBannerHeading, coverImage, breadcrums } = bannerData;
  // console.log("supplier data", supplierFormContent);
  // const { toptitle: supplierFormTitle, heading: supplierFormHeading, description: supplierFormDescription } = supplierFormContent;

  return (
    <>
      {/* <ApolloProvider client={client}> */}

      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <SupplierSection
        title={title}
        heading={heading}
        description={description}
      />
      {/* </ApolloProvider> */}
    </>
  );
};

export default page;
