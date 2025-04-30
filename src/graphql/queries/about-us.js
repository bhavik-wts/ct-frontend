import { gql } from "@apollo/client";

export const GET_ABOUT_US_PAGE_DATA = gql`
 query {
  pages(filters: { slug: { eq: "about-us" } }) {
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
          ... on ComponentElementsImageBannerDetail {
            BannerTitle
            Banner {
              data {
                attributes {
                  url
                  name
                }
              }
            }
          }
          ... on ComponentCommonComponentsTeamCarouselSlider {
            TopTitle
            Heading
            description
            SliderType
            TeamDetail {
              Name
              Designation
              Image {
                data {
                  attributes {
                    url
                    name
                  }
                }
              }
            }
          }
          ... on ComponentCommonComponentsTeamCarouselSlider {
            Heading
            description
            TopTitle
            description
            SliderType
            TeamDetail {
              Name
              Designation
              Image {
                data {
                  attributes {
                    url
                    name
                  }
                }
              }
            }
          }
          ... on ComponentCommonComponentsCtAsection{
            toptitle
            heading
            description
            Buttonlabel
            buttonlink
            backgroundimage{
              data{
                attributes{
                  url,
                  name
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