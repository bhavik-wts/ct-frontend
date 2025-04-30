import Banner from "@/components/shared/Banner";
import BlogSocialContributionContainer from "@/components/shared/BlogSocialContributionContainer";
import { GET_BLOG_LISTING_PAGE_DATA } from "@/graphql/queries/blogs-listing";
import { GET_ALL_BLOGS } from "@/graphql/queries/get-all-blogs";
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_BLOG_LISTING_PAGE_DATA);
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

export default async function Page() {
  const graphqlData = await fetchData(GET_BLOG_LISTING_PAGE_DATA);
  const bannerData = graphqlData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  const allBlogs = await fetchData(GET_ALL_BLOGS);

  return (
    <>
      <Banner
        subText={subText}
        heading={commonBannerHeading}
        coverImage={coverImage}
        breadcrums={breadcrums}
      />
      <BlogSocialContributionContainer
        isBlogPage={true}
        data={allBlogs.blog.data}
      />
    </>
  );
}
