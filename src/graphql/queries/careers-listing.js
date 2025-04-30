import { gql } from "@apollo/client";

export const GET_CAREER_LISTING_DATA = gql`
 query {
  pages(filters: { slug: { eq: "careers" } }) {
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
          ... on ComponentCommonComponentsLifeSlider {
            toptitle
            lifeSliderMainTitle: maintitle
            LifeSliderDetails {
              slideimage {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
          ... on ComponentCommonComponentsTeamCarouselSlider {
            TopTitle
            Heading
            SliderType
            description
            TeamDetail {
              Name
              Designation
              Image {
                data {
                  attributes {
                    name
                    url
                  }
                }
              }
            }
          }
          ... on ComponentCommonComponentsTestimonialSlider {
            toptitle
            testimonailSliderMainTitle : maintitle
            description
            Testimonials {
              name
              city
              content
              Image {
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
    }
  }
}
`;