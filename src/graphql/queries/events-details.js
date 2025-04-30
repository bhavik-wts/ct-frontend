import { gql } from "@apollo/client";

export const GET_EVENT_DETAIL_PAGE_DATA = gql`
  query GetBlogBySlug($slug: String!) {
  pages(filters: { slug: { eq: "event-details" } }) {
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
            maintitle
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
        }
      }
    }
  }
  recentEvents: event(
      sort: ["publishedAt:desc"]
      pagination: { limit: 3 }
    ) {
      data{
        attributes{
          Title
          slug
          Image{
            data{
              attributes{
                url
                name
              }
            }
          }
          startdate
          enddate
        }
      }
  }
  eventBySlug: event(
      filters: {
        slug: {
          eq: $slug
        }
      }
    ) {
      data {
        attributes{
          Title
          slug
          Image{
            data{
              attributes{
                name
                url
              }
            }
          }
          startdate
          enddate
          venue
          content
          publishedAt
        }
      }
    }
  
}
`;