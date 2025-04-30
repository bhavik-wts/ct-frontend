import { gql } from "@apollo/client";

export const GET_ALL_SOCIAL_CONTRIBUTIONS = gql`
  query GetALLSocialContributions {
    socialContributions(sort: ["publishedAt:desc"]) {
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
