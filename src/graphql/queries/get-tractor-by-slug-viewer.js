import { gql } from "@apollo/client";

export const GET_TRACTOR_BY_SLUG_VIEWER = gql`
  query GetTractorBySlug($slug: String!) {
    tractors(filters: { slug: { eq: $slug } }) {
      data {
        id
        attributes {
          colors {
            data {
              attributes {
                colorName
                colorCode
              }
            }
          }
          name
          tractorType
          GLBfile {
            data {
              attributes {
                name
                url
              }
            }
          }
          tractor_category {
            data {
              attributes {
                name
                link
              }
            }
          }
          HotspotDetail {
            id
            dataPositionX
            dataPositionY
            dataPositionZ

            dataNormalX
            dataNormalY
            dataNormalZ

            camaraOrbitPhi
            camaraOrbitTheta
            camaraOrbitRadius

            fieldOfView
            hotspotLabel
            hotspotContent
          }
        }
      }
    }
  }
`;
