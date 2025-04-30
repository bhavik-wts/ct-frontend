import React from "react";
import Banner from "@/components/shared/Banner";
import CareerContentSection from "@/components/pages/Careers/CareerContentSection";
import ImageSlider from "@/components/pages/Careers/ImageSlider";
import BoardMemberSlider from "@/components/pages/Careers/BoardMemberSlider";
import JobListing from "@/components/pages/Careers/JobListing";
import SocialContributionSlider from "@/components/shared/SocialContributionSlider";
import TestimonialSlider from "@/components/shared/TestimonialSlider";

import { GET_CAREER_LISTING_DATA } from "@/graphql/queries/careers-listing";
import { GET_ALL_JOBS } from "@/graphql/queries/getAllJobs";
import { GET_HOME_PAGE_DATA } from "@/graphql/queries/get-homepage-data";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_CAREER_LISTING_DATA);
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
  const graphqlData = await fetchData(GET_CAREER_LISTING_DATA);
  const allJobsGraphqlData = await fetchData(GET_ALL_JOBS);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const {
    toptitle: lifeSliderTopTitle,
    lifeSliderMainTitle,
    LifeSliderDetails: lifeSliderData,
  } = graphqlData.pages.data[0].attributes.blocks[1];
  const {
    TopTitle: teamSliderTopTitle,
    Heading: teamSliderHeading,
    SliderType: teamSliderType,
    description: teamSliderDescription,
    TeamDetail: teamSliderData,
  } = graphqlData.pages.data[0].attributes.blocks[2];
  const {
    toptitle: testimonialSliderTopTitle,
    testimonailSliderMainTitle: testimonialSliderHeading,
    description: testimonialSliderDescription,
    Testimonials: testimonialData,
  } = graphqlData.pages.data[0].attributes.blocks[3];

  const homePageData = await fetchData(GET_HOME_PAGE_DATA);
  const socialContributionSliderData =
    homePageData.pages.data[0].attributes.blocks[5];
  const {
    socialContributionTopTitle,
    socialContributionMainHeading,
    socialContributionDescription,
  } = socialContributionSliderData;

  const socialContributionData =
    homePageData.socialContributions.allSocialContributions;
  const socialContributionDataSliderAllData = {
    title: socialContributionTopTitle,
    heading: socialContributionMainHeading,
    subtext: socialContributionDescription,
    sliderData: socialContributionData,
  };

  const allJobs = allJobsGraphqlData.currentOpening.data;

  const boardMemberSliderData = {
    heading: teamSliderHeading,
    subHeading: teamSliderTopTitle,
    description: teamSliderDescription,
    bgWhite: true,
    sliderType: teamSliderType,
    data: teamSliderData,
  };
  const testimonialSliderData = {
    heading: testimonialSliderHeading,
    subHeading: testimonialSliderTopTitle,
    description: testimonialSliderDescription,
    bgWhite: true,
    sliderType: "testimonial",
    data: testimonialData,
  };
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <CareerContentSection isLeft={true} img={"job-listing-01.jpg"}>
        <h3>Team Human Resources</h3>
        <h2>Human Capital Philosophy</h2>
        <p>
          Any organization grows on its two foundation pillars, Infrastructure
          and Human Resources; they enable the organizations to attain the
          unimaginable milestones. Human Resource plays a vital role in the
          performance of an organization and we at Captain Tractors believe in
          attracting, nurturing and retaining the talent available in the
          country, which is an abundant pool of talented intellectual Human
          Resource.
        </p>
        <p>
          We have a great mix of young latent talent and highly experienced
          professionals. Our collaborations with the world leaders in automotive
          technology is our strength and provides multiple opportunities to our
          employees to gain expertise in their respective fields.
        </p>
        <p>
          Captain Tractors believes in growing together along with the valuable
          team members who have excelled in performance, thereby making us one
          of the leading OEM in the Compact Tractor segment.
        </p>
      </CareerContentSection>
      <CareerContentSection img={"job-listing-02.jpg"}>
        <h3>Team Human Resources</h3>
        <h2>Why Captain Tractors</h2>
        <p>
          At <b>Captain Tractors</b>, employees are considered its most
          important strategic resource. Wherever you are in Captain Tractors,
          you&apos;ll be in good surroundings and encouraged to collaborate and
          grow.
        </p>
        <p>
          Our culture attracts and retains the best talent by providing a
          caring, considerate work environment with flexibility, collaboration,
          recognition and respect. It is a culture of learning and innovation,
          where mentoring and being mentored go hand-in- hand.
        </p>
      </CareerContentSection>
      <ImageSlider
        topTitle={lifeSliderTopTitle}
        mainHeading={lifeSliderMainTitle}
        data={lifeSliderData}
      />
      <CareerContentSection isLeft={true} img={"job-listing-03.jpg"}>
        <h3>Team Human Resources</h3>
        <h2>Work Life Balance</h2>
        <p>
          Work-life balance is a concept that supports the efforts of employees
          to split their time and energy between work and the other important
          aspects of their lives. Work-life balance is a daily effort to make
          time for family, friends, community participation, spirituality,
          personal growth, self-care, and other personal activities, in addition
          to the demands of the workplace.
        </p>
        <br />
        <ul>
          <li>Our Employee enjoy a high degree of flexibility at work</li>
          <li>
            The lunch break is at a designated time each day, enabling
            colleagues to interact and eat together, thus getting away from own
            desks.
          </li>
          <li>
            Including many welfare facilities i.e. Canteen, Bus Facility, Group
            Personal Accident Policy, Group Mediclaim Policy, Loan Facility, LTA
            etc.
          </li>
          <li>
            The Company Welfare Activity is characterized by quality of life and
            a good work-life balance.
          </li>
        </ul>
      </CareerContentSection>
      <CareerContentSection img={"job-listing-04.jpg"}>
        <h3>Team Human Resources</h3>
        <h2>Learning Development</h2>
        <p>
          Captain Tractors Learning & Development is a strategic business
          function contributing significantly to organizational, group and
          individual effectiveness & growth by fostering a strong learning
          culture.
        </p>
        <p>
          Grooming the managers of today into the leaders of tomorrow -
          that&pos;s the broad objective of the Captain Tractors. The
          group&apos;s high-value, superior-quality training interventions are
          targeted at maximizing the potential of its pool of managers. This is
          done by encouraging their cross-functional exposure and by making
          cross-company mobility an integral aspect of all leadership
          development efforts.
        </p>
      </CareerContentSection>
      <CareerContentSection isLeft={true} img={"job-listing-05.jpg"}>
        <h3>Team Human Resources</h3>
        <h2>Awards & Rewards</h2>
        <p>
          Captain Tractors has various prizes to reward performance, Long
          Service & Education.
        </p>
        <br />
        <ul>
          <li>
            &quot;Captain of the Month&quot; an award given to employee for
            achievements & innovation, who have made substantial contributions
            to their function.
          </li>
          <li>
            Monthly & Yearly Kaizen Reward & Recognition for technical &
            non-technical suggestions.
          </li>
          <li>
            Every year we celebrate a Sports & Education Awards for Employees
            Children.
          </li>
          <li>
            Hall of the Fame Award: Employees who have completed 05 years or
            more than 05 years with the company, they are honored.
          </li>
        </ul>
      </CareerContentSection>
      <SocialContributionSlider
        data={socialContributionDataSliderAllData}
        type={"contribution"}
      />
      <BoardMemberSlider {...boardMemberSliderData} />
      <TestimonialSlider allData={testimonialSliderData} />
      <CareerContentSection isLeft={true} img={"job-listing-06.jpg"}>
        <h3>Caution Notice</h3>
        <h2>Recruitment Fraud</h2>
        <p>
          It has come to our notice that some unscrupulous agencies are alluring
          job aspirants with employment opportunities with Captain Tractors
          Private Limited/Group Companies and extracting money as security
          deposit or documentation processing fees. We would like everyone to be
          aware that “Captain Tractors Private Limited” never requires
          applicants to pay any amount of monies in any form or for any purpose
          at any stage of its recruitment and selection process.
        </p>
      </CareerContentSection>
      <JobListing data={allJobs} />
    </>
  );
};

export default page;
