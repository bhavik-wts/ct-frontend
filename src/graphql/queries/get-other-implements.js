import { gql } from "@apollo/client";

export const GET_OTHER_IMPLEMENTS = gql`
   query GetOtherImplements($categoryName: String!) {
    implements(filters: { implement_category: { name: { eq: $categoryName } } }) {
    data {
      attributes {
        slideMainimage {
          data {
            attributes {
              name
              url
            }
          }
        }
        name
        approxWeight
        length
        width
        height
        slug
      }
    }
  }
}

`;