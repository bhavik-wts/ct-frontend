import { gql } from "@apollo/client";

export const GET_BECOME_A_SUPPLIER_PAGE_DATA = gql`
 query {
  pages(filters: { slug: { eq: "become-a-supplier" } }) {
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
            id
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