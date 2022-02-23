import type { AnyAction } from 'redux';
import actionTypes from './actionTypes';
import { SelectedProduct } from '../utils/interfaces';
import { isSameVariant } from '../utils';

const initialState: SelectedProduct[] = [];

function isProduct(productA: SelectedProduct, productB: SelectedProduct) {
     return (
          productA.id === productB.id && isSameVariant(productA.variant, productB.variant)
     );
}

function cartReducer(state = initialState, action: AnyAction) {
     switch (action.type) {
          case actionTypes.addToCart: {
               const { selectedProduct } = action.payload;
               const product = state.find((item) => isProduct(item, selectedProduct));
               if (!product) {
                    return [...state, action.payload.selectedProduct];
               }

               product.quantity += 1;
               return [...state];
          }
          case actionTypes.updateCart: {
               const { product, quantity } = action.payload;
               if (!quantity) {
                    return [...state.filter((p) => !isProduct(p, product))];
               }

               const prdct = state.find((p) => isProduct(p, product));

               if (prdct) {
                    prdct.quantity = quantity;
               }
               return [...state];
          }
          case actionTypes.removeFromCart: {
               const { product } = action.payload;
               return [...state.filter((p) => !isProduct(p, product))];
          }
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
     currency: currencyReducer,
};

export default rootReducer;
