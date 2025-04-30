import { gql } from "@apollo/client";

export const GET_DOMESTIC_NETWORK_PAGE_DATA = gql`
  query GetDomesticNetworkData {
    pages(filters: { slug: { eq: "domestic-network" } }) {
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
