import { combineReducers, createStore } from 'redux';
import cartReducer from './reducers';

const store = createStore(combineReducers(cartReducer));

export default store;
