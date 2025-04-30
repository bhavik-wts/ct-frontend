import { gql } from "@apollo/client";

export const GET_FIND_A_DEALER_DATA = gql`
  query {
    pages(filters: { slug: { eq: "find-a-dealer" } }) {
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
