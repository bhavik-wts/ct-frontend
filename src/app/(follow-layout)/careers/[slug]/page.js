import JobDetailsContainer from "@/components/pages/careerDetails/JobDetailsContainer";
import Banner from "@/components/shared/Banner";
import RecentPostContainer from "@/components/shared/RecentPostContainer";
import { getCareerDetailBannerData } from "@/data/loaders";
import { findBlockByComponent } from "@/lib/utils";
import { GET_JOB_BY_SLUG } from "@/graphql/queries/getJobBySlug"; // New query for blog by slug
import { GET_CAREER_DETAIL_PAGE_DATA } from "@/graphql/queries/career-details"; // New query for blog by slug
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_CAREER_DETAIL_PAGE_DATA);
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

const Page = async ({ params }) => {
  const { slug } = params; // Get the slug from params

  const graphqlDetailData = await fetchData(GET_CAREER_DETAIL_PAGE_DATA);
  const bannerData = graphqlDetailData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  // Create a new updatedBreadcrum array
  const slugLink = `/careers/${slug}`; // Create the new link using the slug
  const updatedBreadcrum = breadcrums.map((item, index) => {
    if (index === breadcrums.length - 1) {
      return { ...item, link: slugLink }; // Update the last breadcrumb's link
    }
    return item; // Return unchanged breadcrumb
  });

  const graphqlCareerBySlugData = await fetchData(GET_JOB_BY_SLUG, { slug });
  const careerData = graphqlCareerBySlugData.currentOpening.data[0]; // Get the first blog post
  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={updatedBreadcrum}
      />
      <JobDetailsContainer data={careerData} />
    </>
  );
};

export default Page;
