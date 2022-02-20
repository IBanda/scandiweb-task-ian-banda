import { graphql } from 'msw';
import { categories, products } from './data';

export const handlers = [
     graphql.query('GetCategories', (req, res, ctx) => {
          return res(
               ctx.data({
                    categories: categories.map((cat) => ({ name: cat.name })),
               })
          );
     }),
     graphql.query('GetCurrencies', (req, res, ctx) => {
          return res(
               ctx.data({
                    currencies: [
                         {
                              label: 'USD',
                              symbol: '$',
                         },
                         { label: 'GBP', symbol: '£' },
                    ],
               })
          );
     }),
     graphql.query('GetCategory', (req, res, ctx) => {
          const {
               input: { title },
          } = req.variables;
          return res(
               ctx.data({
                    category: categories.find((cat) => cat.name === title),
               })
          );
     }),
     graphql.query('GetProduct', (req, res, ctx) => {
          const { id } = req.variables;
          return res(
               ctx.data({
                    product: products.find((product) => product.id === id),
               })
          );
     }),
];
