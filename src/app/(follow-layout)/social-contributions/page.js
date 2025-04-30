import Banner from "@/components/shared/Banner";
import BlogSocialContributionContainer from "@/components/shared/BlogSocialContributionContainer";
import { GET_SOCIAL_CONTRIBUTION_LISTING_PAGE_DATA } from "@/graphql/queries/social-contribution-listing";
import { fetchData } from "@/lib/graphql-operations";
import { GET_ALL_SOCIAL_CONTRIBUTIONS } from "@/graphql/queries/get-all-social-contributions";

export async function generateMetadata() {
  const graphqlData = await fetchData(
    GET_SOCIAL_CONTRIBUTION_LISTING_PAGE_DATA
  );
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

export default async function SocialContributionsPage() {
  const graphqlData = await fetchData(
    GET_SOCIAL_CONTRIBUTION_LISTING_PAGE_DATA
  );
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const allSocialContributions = await fetchData(GET_ALL_SOCIAL_CONTRIBUTIONS);

  const socialContributions = allSocialContributions.socialContributions.data;

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <BlogSocialContributionContainer data={socialContributions} />
    </>
  );
}
