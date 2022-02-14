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
               products {
                    id
                    name
                    inStock
                    gallery
                    prices {
                         currency {
                              symbol
                         }
                         amount
                    }
               }
          }
     }
`;
