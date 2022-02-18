import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
     query GetProducts {
          categories {
               name
          }
     }
`;

export const GET_CURRENCIES = gql`
     query GetCurrencies {
          currencies {
               label
               symbol
          }
     }
`;

export const GET_CATEGORY = gql`
     query GetCategory($input: CategoryInput) {
          category(input: $input) {
               name
               products {
                    id
                    name
                    inStock
                    brand
                    gallery
                    prices {
                         currency {
                              symbol
                         }
                         amount
                    }
                    attributes {
                         id
                         name
                         type
                         items {
                              id
                              displayValue
                              value
                         }
                    }
               }
          }
     }
`;

export const GET_PRODUCT = gql`
     query GetProduct($id: String!) {
          product(id: $id) {
               id
               name
               description
               brand
               prices {
                    amount
                    currency {
                         label
                         symbol
                    }
               }
               gallery
               inStock
               attributes {
                    id
                    name
                    type
                    items {
                         id
                         displayValue
                         value
                    }
               }
               category
          }
     }
`;
