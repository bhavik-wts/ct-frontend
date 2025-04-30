import { gql } from "@apollo/client";

export const GET_TRACTOR_DETAILS_PAGE_DATA = gql`
  query GetTractorDetails($categoryName: String!) {
    pages(filters: { slug: { eq: "tractor-details" } }) {
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
            ... on ComponentCommonComponentsCtAsection {
              backgroundimage {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
              toptitle
              heading
              description
              Buttonlabel
              buttonlink
            }
          }
        }
      }
    }
    tractors(
      sort: ["publishedAt:desc"]
      pagination: { limit: 3 }
      filters: { tractor_category: { name: { eq: $categoryName } } }
    ) {
      data {
        attributes {
          name
          slug
          modelType: type
          tractorType
          tractor_category {
            data {
              attributes {
                name
              }
            }
          }
          colors {
            data {
              attributes {
                colorCode
                colorName
              }
            }
          }
          slideMainimage {
            data {
              attributes {
                name
                url
              }
            }
          }
        }
      }
    }
  }
`;
