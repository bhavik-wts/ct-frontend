import { gql } from "@apollo/client";

export const GET_IMPLEMENTS_DETAILS_PAGE_DATA = gql`
   query GetImplementDetailsPage {

pages(filters: { slug: { eq: "implement-detail" } }) {
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
          ... on ComponentCommonComponentsCtAsection{
            toptitle
            heading
            description
            Buttonlabel
            buttonlink
            backgroundimage{
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
`;