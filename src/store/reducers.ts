import type { AnyAction } from 'redux';
import actionTypes from './actionTypes';
import { SelectedProduct } from '../utils/interfaces';
import { isSameVariant } from '../utils';

const initialState: SelectedProduct[] = [];

function productPredicate(productA: SelectedProduct, productB: SelectedProduct) {
     return (
          productA.id === productB.id && isSameVariant(productA.variant, productB.variant)
     );
}

function cartReducer(state = initialState, action: AnyAction) {
     switch (action.type) {
          case actionTypes.addToCart: {
               const { selectedProduct } = action.payload;
               const product = state.find((item) => item.id === selectedProduct.id);
               if (!product) {
                    return [...state, action.payload.selectedProduct];
               }
               if (!isSameVariant(product.variant, selectedProduct.variant)) {
                    return [...state, action.payload.selectedProduct];
               }
               product.quantity += 1;
               return [...state];
          }
          case actionTypes.updateCart: {
               const { product, quantity } = action.payload;
               if (!quantity) {
                    return [...state.filter((p) => !productPredicate(p, product))];
               }

               const prdct = state.find((p) => productPredicate(p, product));

               if (prdct) {
                    prdct.quantity = quantity;
               }
               return [...state];
          }
          case actionTypes.removeFromCart: {
               const { product } = action.payload;
               return [...state.filter((p) => !productPredicate(p, product))];
          }
          default:
               return state;
     }
}

function categoryReducer(state = 'all', action: AnyAction) {
     switch (action.type) {
          case actionTypes.changeCategory:
               return action.payload.category;
          default:
               return state;
     }
}

const initialCurrency = {
     label: 'USD',
     symbol: '$',
};

function currencyReducer(state = initialCurrency, action: AnyAction) {
     switch (action.type) {
          case actionTypes.changeCurrency:
               return action.payload.currency;
          default:
               return state;
     }
}

const rootReducer = {
     cart: cartReducer,
     category: categoryReducer,
     currency: currencyReducer,
};

export default rootReducer;
