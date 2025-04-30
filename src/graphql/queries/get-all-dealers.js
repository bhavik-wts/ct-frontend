import { gql } from "@apollo/client";

export const GET_ALL_DEALERS = gql`
  query GetAllDealers {
    dealers {
      data {
        attributes {
          Title
          District
          State
          Address
          Email
          mobileNumber
          Category
        }
      }
    }
  }
`;
