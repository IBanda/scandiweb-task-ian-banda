import product from '../pages/product';

export const products = [
     {
          id: 'huarache-x-stussy-le',
          name: 'Nike Air Huarache Le',
          inStock: true,
          description: '<p>Great sneakers for everyday use!</p>',
          brand: 'Nike x Stussy',
          category: 'clothes',
          gallery: [
               'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087',
               'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087',
               'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087',
               'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087',
               'https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087',
          ],
          prices: [
               {
                    currency: {
                         symbol: '$',
                         label: 'USD',
                    },
                    amount: 144.69,
               },
               {
                    currency: {
                         symbol: '£',
                         label: 'GBP',
                    },
                    amount: 104,
               },
          ],
          attributes: [
               {
                    id: 'Size',
                    name: 'Size',
                    type: 'text',
                    items: [
                         {
                              id: '40',
                              displayValue: '40',
                              value: '40',
                         },
                         {
                              id: '41',
                              displayValue: '41',
                              value: '41',
                         },
                         {
                              id: '42',
                              displayValue: '42',
                              value: '42',
                         },
                         {
                              id: '43',
                              displayValue: '43',
                              value: '43',
                         },
                    ],
               },
          ],
     },
     {
          id: 'ps-5',
          name: 'PlayStation 5',
          inStock: false,
          description: '<p>Awesome winter jacket</p>',
          brand: 'Sony',
          category: 'tech',
          gallery: [
               'https://images-na.ssl-images-amazon.com/images/I/510VSJ9mWDL._SL1262_.jpg',
               'https://images-na.ssl-images-amazon.com/images/I/610%2B69ZsKCL._SL1500_.jpg',
               'https://images-na.ssl-images-amazon.com/images/I/51iPoFwQT3L._SL1230_.jpg',
               'https://images-na.ssl-images-amazon.com/images/I/61qbqFcvoNL._SL1500_.jpg',
               'https://images-na.ssl-images-amazon.com/images/I/51HCjA3rqYL._SL1230_.jpg',
          ],
          prices: [
               {
                    currency: {
                         symbol: '$',
                         label: 'USD',
                    },
                    amount: 844.02,
               },
               {
                    currency: {
                         symbol: '£',
                         label: 'GBP',
                    },
                    amount: 606.67,
               },
          ],
          attributes: [
               {
                    id: 'Color',
                    name: 'Color',
                    type: 'swatch',
                    items: [
                         {
                              id: 'Green',
                              displayValue: 'Green',
                              value: '#44FF03',
                         },
                         {
                              id: 'Cyan',
                              displayValue: 'Cyan',
                              value: '#03FFF7',
                         },
                         {
                              id: 'Blue',
                              displayValue: 'Blue',
                              value: '#030BFF',
                         },
                         {
                              id: 'Black',
                              displayValue: 'Black',
                              value: '#000000',
                         },
                         {
                              id: 'White',
                              displayValue: 'White',
                              value: '#FFFFFF',
                         },
                    ],
               },
               {
                    id: 'Capacity',
                    name: 'Capacity',
                    type: 'text',
                    items: [
                         {
                              id: '512G',
                              displayValue: '512G',
                              value: '512G',
                         },
                         {
                              id: '1T',
                              displayValue: '1T',
                              value: '1T',
                         },
                    ],
               },
          ],
     },
];

export const categories = [
     { name: 'all', products },
     {
          name: 'clothes',
          products: products.filter((product) => product.category === 'clothes'),
     },
     {
          name: 'tech',
          products: products.filter((product) => product.category === 'tech'),
     },
];
