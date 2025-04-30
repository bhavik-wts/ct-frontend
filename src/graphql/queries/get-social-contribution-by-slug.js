import { gql } from "@apollo/client";

export const GET_SOCIAL_CONTRIBUTION_BY_SLUG = gql`
  query GetSocialContributionDetailsBySlug($slug: String!) {
    socialContributions(
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
          content
        }
      }
    }
  }
`;