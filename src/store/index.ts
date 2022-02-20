import { combineReducers, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers';

const persistConfig = {
     keyPrefix: 'store-',
     key: 'root',
     storage,
     blacklist: ['category'],
};

const persistedReducer = persistReducer(persistConfig, combineReducers(rootReducer));

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
