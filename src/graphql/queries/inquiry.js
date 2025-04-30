import { gql } from "@apollo/client";

export const GET_INQUIRY_PAGE_DATA = gql`
  query {
    pages(filters: { slug: { eq: "inquiry" } }) {
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
            ... on ComponentBlockInquiryheading {
              toptitle
              heading
              description
            }
          }
        }
      }
    }
  }
`;
