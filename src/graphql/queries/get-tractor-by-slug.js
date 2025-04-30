import { gql } from "@apollo/client";

export const GET_TRACTOR_BY_SLUG = gql`
  query GetTractorBySlug($slug: String!) {
    tractors(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          tractor_category {
            data {
              attributes {
                name
              }
            }
          }
          type
          name
          description
          slug
          colormedia {
            data {
              attributes {
                name
                url
              }
            }
          }
          YoutubeLink {
            id
            youtubevideourl
          }
          commonblocks {
            ... on ComponentBlockCommonFeature {
              topTitle
              mainHeading
              features {
                id
                title
                description
                image {
                  data {
                    attributes {
                      name
                      url
                    }
                  }
                }
              }
            }
            ... on ComponentBlockCommonSlider {
              modelSlider {
                slide {
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
          specificationTopTitle
          specificationMainTitle
          specification {
            title
            image {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            typeDetail {
              title
              value
            }
          }
        }
      }
    }
  }
`;
