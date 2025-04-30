import { gql } from "@apollo/client";

export const GET_TRACTOR_LISTING_PAGE = gql`
 query  GetTractorPageData{
  pages(filters: { slug: { eq: "tractors-page" } }) {
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
        }
        
      }
    }
  }
  tractorCategorywiseData:tractorCategories {
    data {
      attributes {
        name
        tractors {
          data {
            attributes {
              name
              slug
              modelType:type
              internationalTractorLink
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
              description
            }
          }
        }
      }
    }
  }
}
`;