import { gql } from "@apollo/client";

export const GET_ALL_JOBS = gql`
  query GetRecentJobs {
    currentOpening(
      sort: ["publishedAt:desc"]
    ) {
       data{
        attributes{
          title
          slug
          city
          experienceDetail
          Responsibilities{
            id
            title
          }
          Requirements{
            id
            tile
          }
          Qualifications{
            id
            title
          }
          createdAt
        }
      }
    }
  }
`;