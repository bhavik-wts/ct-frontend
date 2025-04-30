import { gql } from "@apollo/client";

export const GET_MENU_DATA = gql`
 query GetTractorsGroupedByCategory {
  tractorCategorywiseData:tractorCategories {
    data {
      attributes {
        name
        tractors {
          data {
            attributes {
              name
              slug
              tractorType
              internationalTractorLink
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
  implementCategorywiseData:implementCategories {
    data {
      attributes {
        name
        implements {
          data {
            attributes{
              name
              slug
              approxWeight
              length
              width
              height
              description
              slideMainimage{
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