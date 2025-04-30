import { gql } from "@apollo/client";

export const GET_SOCIAL_CONTRIBUTION_DETAIL_PAGE_DATA = gql`
  query {
  pages(filters: { slug: { eq: "social-contribution-detail" } }) {
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
          ... on ComponentCommonComponentsLifeSlider{
            toptitle
            maintitle
            LifeSliderDetails{
              slideimage{
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
}
`;