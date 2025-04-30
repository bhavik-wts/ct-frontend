import { gql } from "@apollo/client";

export const GET_ALL_EVENTS = gql`
  query GetAllEvents {
  event(sort: ["publishedAt:desc"]) {
    data {
      id
      attributes {
        Title
        slug
        startdate
        enddate
        Image {
          data {
            attributes {
              name
              url
            }
          }
        }
        content
        
      }
    }
  }
}
`;