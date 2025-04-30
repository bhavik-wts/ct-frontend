import Sharebar from "@/components/pages/blogDetails/Sharebar";
import Banner from "@/components/shared/Banner";
import RecentPostContainer from "@/components/shared/RecentPostContainer";
import ContentRenderer from "@/components/shared/ContentRenderer";
import BlogSocialContributionContainer from "@/components/shared/BlogSocialContributionContainer";
import { getBlogPostPageData } from "@/data/loaders"; // Unused import, consider removing if not needed
import { findBlockByComponent } from "@/lib/utils";

import { GET_BLOG_DETAIL_PAGE_DATA } from "@/graphql/queries/blog-details"; // Existing query
import { GET_BLOG_BY_SLUG } from "@/graphql/queries/getBlogBySlug"; // New query for blog by slug
import { fetchData } from "@/lib/graphql-operations";

export async function generateMetadata() {
  const graphqlData = await fetchData(GET_BLOG_DETAIL_PAGE_DATA);
  const seoData = await graphqlData.pages.data[0].attributes.Seo;
  return {
    title: seoData.metaTitle,
    description: seoData.metaDescription,
    images: [seoData.metaImage.data],
  };
}

const Page = async ({ params }) => {
  const { slug } = params; // Get the slug from params

  // Fetch data for blog details
  const graphqlDetailData = await fetchData(GET_BLOG_DETAIL_PAGE_DATA);
  const bannerData = graphqlDetailData.pages.data[0].attributes.blocks[0];
  const {
    subText,
    headingAlias: commonBannerHeading,
    coverImage,
    breadcrums,
  } = bannerData;

  // Create a new updatedBreadcrum array
  const slugLink = `/blogs/${slug}`; // Create the new link using the slug
  const updatedBreadcrum = breadcrums.map((item, index) => {
    if (index === breadcrums.length - 1) {
      return { ...item, link: slugLink }; // Update the last breadcrumb's link
    }
    return item; // Return unchanged breadcrumb
  });

  // Fetch data for the specific blog post by slug
  const graphqlSlugData = await fetchData(GET_BLOG_BY_SLUG, { slug });
  const blogPost = graphqlSlugData.blog.data[0]; // Get the first blog post

  // Extract attributes for rendering
  const { attributes } = blogPost;
  const { title, image, publishedAt, content } = attributes;
  const date = new Date(publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
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
          <div className="mt-0">
            <div className="row g-4">
              <div className="col-md-12 col-lg-8">
                <ContentRenderer
                  isBlogPage={true}
                  title={title}
                  image={image}
                  date={date}
                  content={content}
                />
              </div>
              <div className="col-md-12 col-lg-4">
                <div className="sticky-point">
                  <RecentPostContainer />
                  <Sharebar
                    title={title}
                    url={slugLink}
                    image={image?.data?.attributes?.url}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Page;
