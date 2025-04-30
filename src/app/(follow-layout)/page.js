import AboutSection from "@/components/pages/homepage/AboutSection";
import FactSection from "@/components/pages/homepage/FactSection";
import FAQsection from "@/components/pages/homepage/FAQsection";
import HeroSectionSlider from "@/components/pages/homepage/HeroSectionSlider";
import InnovationSection from "@/components/pages/homepage/InnovationSection";
import IntegratedSection from "@/components/pages/homepage/IntegratedSection";
import StoryLine from "@/components/pages/homepage/StoryLine";
import TractorImplementSlider from "@/components/pages/homepage/TractorImplementSlider";
import SocialContributionSlider from "@/components/shared/SocialContributionSlider";
import TestimonialSlider from "@/components/shared/TestimonialSlider";
import { GET_HOME_PAGE_DATA } from "@/graphql/queries/get-homepage-data";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_HOME_PAGE_DATA);
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

export default async function Home() {
  const graphqlData = await fetchData(GET_HOME_PAGE_DATA);
  // console.log("graphql data1", graphqlData);

  //pages
  const homePageData = graphqlData.pages.data[0].attributes.blocks;
  const heroSliderData =
    graphqlData.pages.data[0].attributes.blocks[0].SlideInfo;

  //tractors
  const tractorSliderData = graphqlData.pages.data[0].attributes.blocks[1];
  const {
    tractorSliderTopTitle,
    tractorSliderMainHeading,
    tractorSliderDescription,
  } = tractorSliderData;
  const tractorsData = graphqlData.tractors.allTractors;
  const tractorSliderAllData = {
    title: tractorSliderTopTitle,
    heading: tractorSliderMainHeading,
    subtext: tractorSliderDescription,
    sliderData: tractorsData,
  };

  //implements
  const implementSliderData = graphqlData.pages.data[0].attributes.blocks[3];
  const {
    implementSliderTopTitle,
    implementSliderMainHeading,
    implementSliderDescription,
  } = implementSliderData;
  const implementsData = graphqlData.implements.allImplements;
  const implementSliderAllData = {
    title: implementSliderTopTitle,
    heading: implementSliderMainHeading,
    subtext: implementSliderDescription,
    sliderData: implementsData,
  };

  //socialcontributions
  const socialContributionSliderData =
    graphqlData.pages.data[0].attributes.blocks[5];
  const {
    socialContributionTopTitle,
    socialContributionMainHeading,
    socialContributionDescription,
  } = socialContributionSliderData;

  const socialContributionData =
    graphqlData.socialContributions.allSocialContributions;
  const socialContributionDataSliderAllData = {
    title: socialContributionTopTitle,
    heading: socialContributionMainHeading,
    subtext: socialContributionDescription,
    sliderData: socialContributionData,
  };

  const blogSliderData = graphqlData.pages.data[0].attributes.blocks[7];
  const { blogsTopTitle, blogsMainHeading, blogsDescription } = blogSliderData;

  const blogData = graphqlData.blog.data;
  const blogSliderAllData = {
    title: blogsTopTitle,
    heading: blogsMainHeading,
    subtext: blogsDescription,
    sliderData: blogData,
  };

  const testimonialSliderData = graphqlData.pages.data[0].attributes.blocks[6];
  const {
    testimonialSliderTopTitle,
    testimonialSliderMainTitle,
    testimonialSliderDescription,
    testimonials,
  } = testimonialSliderData;

  const testimonialSliderAllData = {
    heading: testimonialSliderMainTitle,
    subHeading: testimonialSliderTopTitle,
    description: testimonialSliderDescription,
    bgWhite: true,
    sliderType: "testimonial",
    data: testimonials,
  };

  const factsSectionAllData = graphqlData.pages.data[0].attributes.blocks[8];
  console.log("factsSectionData", factsSectionAllData);

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


  const integratedSectionData = graphqlData.pages.data[0].attributes.blocks[2];
  const storylineSectionVideo = graphqlData.pages.data[0].attributes.blocks[4];

  return (
    <>
      <HeroSectionSlider data={heroSliderData} />
      <AboutSection />
      <TractorImplementSlider data={tractorSliderAllData} />
      <IntegratedSection data={integratedSectionData} />
      <TractorImplementSlider data={implementSliderAllData} isImplement={true} />
      <StoryLine data={storylineSectionVideo} />
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
      <InnovationSection />
      <SocialContributionSlider
        data={socialContributionDataSliderAllData}
        type={"contribution"}
      />
      <TestimonialSlider allData={testimonialSliderAllData} />
      <SocialContributionSlider data={blogSliderAllData} type={"blog"} />
      <FAQsection />
    </>
  );
}
