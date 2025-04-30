import { gql } from "@apollo/client";

export const GET_BLOG_BY_SLUG = gql`
  query GetBlogBySlug($slug: String!) {
    blog(
      filters: {
        slug: {
          eq: $slug
        }
      }
    ) {
      data {
        id
        attributes {
          title
          slug
          image {
            data {
              attributes {
                name
                url
              }
            }
          }
          publishedAt
          content
        }
      }
    }
  }
`;