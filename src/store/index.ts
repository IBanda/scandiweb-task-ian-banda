import { combineReducers, createStore } from 'redux';
import rootReducer from './reducers';

const store = createStore(combineReducers(rootReducer));

export default store;
