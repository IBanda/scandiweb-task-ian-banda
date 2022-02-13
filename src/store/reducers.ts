import type { Action } from 'redux';

const initialState = {
     cart: [],
};

function cartReducer(state = initialState, action: Action) {
     switch (action.type) {
          default:
               return state;
     }
}

export default cartReducer;
