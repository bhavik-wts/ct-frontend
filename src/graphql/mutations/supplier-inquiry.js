import { gql } from '@apollo/client';

export const SUBMIT_SUPPLIER_INQUIRY = gql`
  mutation createSupplierInquiry($input: SupplierInquiryInput!) {
    createSupplierInquiry(data: $input) {
      data {
        id
        attributes {
          companyName
          profileDescription
          email
          mobileNumber
          addressLine1
          addressLine2
          city
          state
          country
          zipcode
          salesContact
          productsYouProvide
          remarks
          website
          createdAt
          updatedAt
          publishedAt
        }
      }
    }
  }
`;
