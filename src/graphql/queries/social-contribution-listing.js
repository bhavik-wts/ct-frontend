import { gql } from "@apollo/client";

export const GET_SOCIAL_CONTRIBUTION_LISTING_PAGE_DATA = gql`
   query  GetSocialContributionListingPage{
  pages(filters: { slug: { eq: "social-contributions-listing" } }) {
    data {
      attributes {
        Name
        slug
        Seo {
          metaTitle
          metaDescription
          metaImage {
            data {
              attributes {
                name
                alternativeText
                width
                height
                formats
              }
            }
          }
        }
        blocks {
          ... on ComponentBlockCommonHeader {
            subText
            headingAlias: heading # Correct aliasing
            coverImage {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            breadcrums {
              id
              title
              link
            }
          }
        }
      }
    }
  }
}
`;