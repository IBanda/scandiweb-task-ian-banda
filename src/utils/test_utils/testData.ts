export const selectedProducts = [
     {
          id: 'apple-imac-2021',
          name: 'iMac 2021',
          inStock: true,
          brand: 'Apple',
          category: 'tech',
          description: 'The new iMac!',
          gallery: [
               'https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202104?wid=904&hei=840&fmt=jpeg&qlt=80&.v=1617492405000',
          ],
          prices: [
               {
                    currency: {
                         symbol: '$',
                         label: 'USD',
                    },
                    amount: 1688.03,
               },
               {
                    currency: {
                         symbol: '£',
                         label: 'GBP',
                    },
                    amount: 1213.34,
               },
          ],
          attributes: [
               {
                    id: 'Capacity',
                    name: 'Capacity',
                    type: 'text',
                    items: [
                         {
                              id: '256GB',
                              displayValue: '256GB',
                              value: '256GB',
                         },
                         {
                              id: '512GB',
                              displayValue: '512GB',
                              value: '512GB',
                         },
                    ],
               },
               {
                    id: 'With USB 3 ports',
                    name: 'With USB 3 ports',
                    type: 'text',
                    items: [
                         {
                              id: 'Yes',
                              displayValue: 'Yes',
                              value: 'Yes',
                         },
                         {
                              id: 'No',
                              displayValue: 'No',
                              value: 'No',
                         },
                    ],
               },
               {
                    id: 'Touch ID in keyboard',
                    name: 'Touch ID in keyboard',
                    type: 'text',
                    items: [
                         {
                              id: 'Yes',
                              displayValue: 'Yes',
                              value: 'Yes',
                         },
                         {
                              id: 'No',
                              displayValue: 'No',
                              value: 'No',
                         },
                    ],
               },
          ],
          variant: {
               Capacity: {
                    id: '256GB',
                    displayValue: '256GB',
                    value: '256GB',
               },
               'With USB 3 ports': {
                    id: 'Yes',
                    displayValue: 'Yes',
                    value: 'Yes',
               },
               'Touch ID in keyboard': {
                    id: 'Yes',
                    displayValue: 'Yes',
                    value: 'Yes',
               },
          },
          quantity: 1,
     },
     {
          id: 'jacket-canada-goosee',
          name: 'Jacket',
          inStock: true,
          brand: 'Canada Goose',
          category: 'clothes',
          description: '<p>Awesome winter jacket</p>',
          gallery: [
               'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016105/product-image/2409L_61.jpg',
               'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016107/product-image/2409L_61_a.jpg',
               'https://images.canadagoose.com/image/upload/w_480,c_scale,f_auto,q_auto:best/v1576016108/product-image/2409L_61_b.jpg',
          ],
          prices: [
               {
                    currency: {
                         symbol: '$',
                         label: 'USD',
                    },
                    amount: 518.47,
               },
               {
                    currency: {
                         symbol: '£',
                         label: 'GBP',
                    },
                    amount: 372.67,
               },
          ],
          attributes: [
               {
                    id: 'Size',
                    name: 'Size',
                    type: 'text',
                    items: [
                         {
                              id: 'Small',
                              displayValue: 'Small',
                              value: 'S',
                         },
                         {
                              id: 'Medium',
                              displayValue: 'Medium',
                              value: 'M',
                         },
                         {
                              id: 'Large',
                              displayValue: 'Large',
                              value: 'L',
                         },
                         {
                              id: 'Extra Large',
                              displayValue: 'Extra Large',
                              value: 'XL',
                         },
                    ],
               },
          ],
          variant: {
               Size: {
                    id: 'Medium',
                    displayValue: 'Medium',
                    value: 'M',
               },
          },
          quantity: 1,
     },
];
