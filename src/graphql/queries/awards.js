import { gql } from "@apollo/client";

export const GET_AWARDS_PAGE_DATA = gql`
 query {
  pages(filters: { slug: { eq: "awards" } }) {
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
            heading
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
          ... on ComponentCommonComponentsBannerSliderDetail {
            BannerDetail {
              toptitle
              heading
              slideimage {
                data {
                  id
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
    }
  }
}
`;