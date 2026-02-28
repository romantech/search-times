import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoriteList from './favoriteList';

const persistConfig = {
  key: 'search-times',
  storage,
  whitelist: ['favoriteList'],
};

const rootReducer = combineReducers({ favoriteList });
export type RootState = ReturnType<typeof rootReducer>;

export const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
