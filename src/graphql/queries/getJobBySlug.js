import { gql } from "@apollo/client";

export const GET_JOB_BY_SLUG = gql`
  query GetJobBySlug($slug: String!) {
    currentOpening(
      filters: {
        slug: {
          eq: $slug
        }
      }
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