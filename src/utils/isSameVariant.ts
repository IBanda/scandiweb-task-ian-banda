import { Variant } from './interfaces';

export default function isSameVariant(variantA: Variant, variantB: Variant) {
     let isEqual = true;
     Object.keys(variantA).forEach((item) => {
          if (!(variantA[item].id === variantB[item].id)) {
               isEqual = false;
          }
     });
     return isEqual;
}
