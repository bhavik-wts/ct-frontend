import DomesticDetails from "@/components/pages/contact-us/DomesticDetails";
import InternationalDetails from "@/components/pages/contact-us/InternationalDetails";
import Banner from "@/components/shared/Banner";
import { GET_CONTACT_US_PAGE_DATA } from "@/graphql/queries/contact-us";
import { fetchData } from "@/lib/graphql-operations";
import React from "react";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_CONTACT_US_PAGE_DATA);
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
  const graphqlData = await fetchData(GET_CONTACT_US_PAGE_DATA);

  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const contactUsDomesticDetails =
    graphqlData.pages.data[0].attributes.blocks[1];
  const {
    mainTitle,
    headOfficeTitle,
    headOfficeCity,
    headOfficeAddress,
    headOfficeEmail,
    headOfficePhone,
    headOfficeMobile,
    registerOfficeTitle,
    registerOfficeCity,
    registerOfficeAddress,
    registerOfficeEmail,
    registerOfficePhone,
    domesticInquiryTitle,
    domesticInquiryPhone,
    supplyChainTitle,
    supplyChainNumber,
    hrEnquiryTitle,
    hrInquiryNumber,
    otherInquiryTitle,
    otherInquiryNumer,
  } = contactUsDomesticDetails;

  const contactUsInternationalDetails =
    graphqlData.pages.data[0].attributes.blocks[2];
  const {
    SectionTitle,
    OfficeTitle,
    officeCity,
    companyName,
    address,
    email,
    phone,
  } = contactUsInternationalDetails;

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />

      <DomesticDetails
        mainTitle={mainTitle}
        headOfficeTitle={headOfficeTitle}
        headOfficeCity={headOfficeCity}
        headOfficeAddress={headOfficeAddress}
        headOfficeEmail={headOfficeEmail}
        headOfficePhone={headOfficePhone}
        headOfficeMobile={headOfficeMobile}
        registerOfficeTitle={registerOfficeTitle}
        registerOfficeCity={registerOfficeCity}
        registerOfficeAddress={registerOfficeAddress}
        registerOfficeEmail={registerOfficeEmail}
        registerOfficePhone={registerOfficePhone}
        domesticInquiryTitle={domesticInquiryTitle}
        domesticInquiryPhone={domesticInquiryPhone}
        supplyChainTitle={supplyChainTitle}
        supplyChainNumber={supplyChainNumber}
        hrEnquiryTitle={hrEnquiryTitle}
        hrInquiryNumber={hrInquiryNumber}
        otherInquiryTitle={otherInquiryTitle}
        otherInquiryNumer={otherInquiryNumer}
      />
      <InternationalDetails
        sectionTitle={SectionTitle}
        officeTitle={OfficeTitle}
        officeCity={officeCity}
        companyName={companyName}
        address={address}
        email={email}
        phone={phone}
      />
    </>
  );
};

export default page;
