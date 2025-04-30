import Banner from "@/components/shared/Banner";
import ContentRenderer from "@/components/shared/ContentRenderer";
import RecentPostContainer from "@/components/shared/RecentPostContainer";
import ImageSlider from "@/components/pages/Careers/ImageSlider";

import { GET_SOCIAL_CONTRIBUTION_BY_SLUG } from "@/graphql/queries/get-social-contribution-by-slug";
import { GET_SOCIAL_CONTRIBUTION_DETAIL_PAGE_DATA } from "@/graphql/queries/social-contirbution-details";

import { fetchData } from "@/lib/graphql-operations";
import OtherSocialContributionsContainer from "@/components/pages/social-contributions/OtherSocialContributionsContainer";
import { GET_ALL_SOCIAL_CONTRIBUTIONS } from "@/graphql/queries/get-all-social-contributions";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_SOCIAL_CONTRIBUTION_DETAIL_PAGE_DATA);
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

  // Fetch data for blog details
  const graphqlDetailData = await fetchData(GET_SOCIAL_CONTRIBUTION_BY_SLUG, {
    slug,
  });
  const allSocialContributions = await fetchData(GET_ALL_SOCIAL_CONTRIBUTIONS);
  const graphqlBannerData = await fetchData(
    GET_SOCIAL_CONTRIBUTION_DETAIL_PAGE_DATA,
    { slug }
  );
  const bannerData = graphqlBannerData.pages.data[0].attributes.blocks[0];
  const pageData = graphqlDetailData.socialContributions.data[0].attributes;

  const { title, image, content } = pageData;
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const slugLink = `/social-contributions/${slug}`; // Create the new link using the slug
  const updatedBreadcrum = breadcrums.map((item, index) => {
    if (index === breadcrums.length - 1) {
      return { ...item, link: slugLink }; // Update the last breadcrumb's link
    }
    return item; // Return unchanged breadcrumb
  });

  const galleryData = graphqlBannerData.pages.data[0].attributes.blocks[1];
  const { toptitle, maintitle, LifeSliderDetails } = galleryData;

  const recentSocialContributions =
    allSocialContributions.socialContributions.data;

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={updatedBreadcrum}
      />
      <section className="blog-details py-80">
        <div className="container">
          <div className=" mt-0">
            <div className="row g-4">
              <ContentRenderer
                isBlogPage={false}
                title={title}
                image={image}
                content={content}
              />
              <div className="col-md-12 col-lg-4">
                <div className="sticky-point">
                  {recentSocialContributions &&
                    recentSocialContributions.length > 0 && (
                      <OtherSocialContributionsContainer
                        data={recentSocialContributions}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ImageSlider
        topTitle={toptitle}
        mainHeading={maintitle}
        data={LifeSliderDetails}
      />
    </>
  );
};

export default Page;
