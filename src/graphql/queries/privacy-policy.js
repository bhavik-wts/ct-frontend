import { gql } from "@apollo/client";

export const GET_PRIVACY_POLICY_PAGE_DATA = gql`
  query  GetPrivacyPolicyData{
  pages(filters: { slug: { eq: "privacy-policy" } }) {
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