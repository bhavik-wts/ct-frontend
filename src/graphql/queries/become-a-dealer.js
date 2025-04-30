import { gql } from "@apollo/client";

export const GET_BECOME_A_DEALER_PAGE_DATA = gql`
  query {
  pages(filters: { slug: { eq: "become-a-dealer" } }) {
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
          ... on ComponentElementsVideoBannerDetail {
            TopTitle
            Heading
            video {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            posterImage {
              data {
                attributes {
                  name
                  url
                }
              }
            }
            description
          }
            ...on ComponentBlockFactsSection {
            factsSectionTopTitle : topTitle
            factsSectionHeading : heading
            factsSectionDescription : description
            factsSectionBackgroundImage : backgroundImage{
              data{
                attributes{
                  name
                  url
                }
              }
            }
            incorporationText
            incorporationSubtext
            
            turnoverText
            turnoverSubtext
            
            volumeText
            volumeSubtext
            
            researchFacilityText
            researchFacilitySubext
            
            
            countriesText
            countriesSubText
            
            
            dealersText
            dealersSubtext
            
            noOfTractorsText
            noOfTractorsSubtext
            
            otherFactText
            otherFactSubtext
          }
        }
      }
    }
  }
}
`;