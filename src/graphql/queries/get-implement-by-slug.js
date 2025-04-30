import { gql } from "@apollo/client";

export const GET_IMPLEMENT_BY_SLUG = gql`
query GetTractorBySlug($slug: String!) {
  implements(filters: { slug: {
          eq: $slug
        } }) {
    data {
      id
      attributes {
        
        name
        description
        implement_category{
          data{
            attributes{
              name
              link
            }
          }
        }
        slideMainimage{
          data{
            attributes{
              name
              url
            }
          }
        }
        sliderDetail{
          id
          menuOrder
          slide{
            data{
              attributes{
                name
                url
              }
            }
          }
        }
        specificationTitle
				specificationMainTitle
        length
        width
        height
        approxWeight
        workingWidth
        workingDepth
        powerReruirement
        approxWeight
      }
    }
  }
}
`;