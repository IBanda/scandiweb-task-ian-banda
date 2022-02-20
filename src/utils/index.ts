import { Attribute, Product, Price, Variant } from './interfaces';

export function getSelectedVariant(product: Product | undefined) {
     const selected: { [name: string]: Attribute } = {};
     if (product?.attributes.length) {
          product.attributes.forEach((attr) => {
               selected[attr.name] = attr.items[0];
          });
     }
     return selected;
}

export function getPrice(prices: Price[] | undefined, currencySymbol: string) {
     return prices?.find((price) => price.currency.symbol === currencySymbol);
}

export function isSameVariant(variantA: Variant, variantB: Variant) {
     let isEqual = true;
     Object.keys(variantA).forEach((item) => {
          if (!(variantA[item].id === variantB[item].id)) {
               isEqual = false;
          }
     });
     return isEqual;
}
