import { gql } from "@apollo/client";

export const GET_COMPANY_HISTORY_PAGE_DATA = gql`
  query {
  pages(filters: { slug: { eq: "company-history" } }) {
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
          ... on ComponentElementsVideoBannerDetail {
            TopTitle
            Heading
            posterImage {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            description
            video {
              data {
                attributes {
                  name
                  url
                }
              }
            }
          }
          ... on ComponentBlockCompanyHistoryTimeline{
            topTitle
            heading
            backgroungImage{
              data{
                attributes{
                  name
                  url
                }
              }
            }
          }
        }
      }
    }
  }
}
`;