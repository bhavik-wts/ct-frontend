import { gql } from "@apollo/client";

export const GET_RECENT_SOCIAL_CONTRIBUTIONS = gql`
query GetRecentBlogs {
    socialContributions(
      sort: ["publishedAt:desc"]
      pagination: { limit: 3 }
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


