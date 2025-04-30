import { gql } from "@apollo/client";

export const GET_TRACTOR_CATEGORIES_LIST = gql`
  query GetTractorCategories($modelType: String) {
    tractorCategories(filters: { tractors: { type: { eq: $modelType } } }) {
      data {
        attributes {
          name
        }
      }
    }
  }
`;
