import { gql } from "@apollo/client";

export const GET_CONTACT_US_PAGE_DATA = gql`
 query GetPrivacyPolicyData {
  pages(filters: { slug: { eq: "contact-us" } }) {
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
          ... on ComponentBlockContactUsDomesticDetail {
            mainTitle
            headOfficeTitle
            headOfficeCity
            headOfficeAddress
            headOfficeEmail
            headOfficePhone
            headOfficeMobile
            registerOfficeTitle
            registerOfficeCity
            registerOfficeAddress
            registerOfficeEmail
            registerOfficePhone

            domesticInquiryTitle

            domesticInquiryPhone

            supplyChainTitle

            supplyChainNumber

            hrEnquiryTitle

            hrInquiryNumber

            otherInquiryTitle

            otherInquiryNumer
          }
          ... on ComponentBlockContactUsInternationalDetail {
            SectionTitle
            OfficeTitle
            officeCity
            companyName
            address
            email
            phone
          }
        }
      }
    }
  }
}

`;