import { gql } from "@apollo/client";

export const GET_ALL_BLOGS = gql`
  query GetRecentBlogs {
    blog(
      sort: ["publishedAt:desc"]
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