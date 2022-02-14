import type { AnyAction } from 'redux';
import actionTypes from './actionTypes';

const initialState = {
     cart: [],
};

function cartReducer(state = initialState, action: AnyAction) {
     switch (action.type) {
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
