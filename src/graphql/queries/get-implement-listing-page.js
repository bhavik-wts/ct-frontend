import { gql } from "@apollo/client";

export const GET_IMPLEMENT_LISTING_PAGE = gql`
query  GetImplementsPageData{
  pages(filters: { slug: { eq: "implement-page" } }) {
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
  implementCategorywiseData:implementCategories {
    data {
      attributes {
        name
        implements{
          data{
            attributes{
              name
              slideMainimage{
                data{
                  attributes{
                    name
                    url
                  }
                }
              }
            	slug
              length
              width
              height
              approxWeight
            }
          }
        }
      }
    }
  }
}
`;