import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import favoriteList from './favoriteList';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['favoriteList'],
};

const rootReducer = combineReducers({ favoriteList });

export default persistReducer(persistConfig, rootReducer);

export type RootState = ReturnType<typeof rootReducer>;
