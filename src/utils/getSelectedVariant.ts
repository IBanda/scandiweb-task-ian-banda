import { Attribute, Product } from './interfaces';

export default function getSelectedVariant(product: Product | undefined) {
     const selected: { [name: string]: Attribute } = {};
     if (product?.attributes.length) {
          product.attributes.forEach((attr) => {
               selected[attr.name] = attr.items[0];
          });
     }
     return selected;
}
