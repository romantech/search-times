import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoriteListState {
  favorites: Article[];
}

const initialState: FavoriteListState = {
  favorites: [],
};

const favoriteListSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    addToFavorites(state, action: PayloadAction<Article>) {
      const isExisting = state.favorites.some((el) => el._id === action.payload._id);
      if (!isExisting) state.favorites.unshift(action.payload);
    },
    removeFromFavorites(state, action: PayloadAction<string>) {
      state.favorites = state.favorites.filter((el) => el._id !== action.payload);
    },
  },
});

export const { addToFavorites, removeFromFavorites } = favoriteListSlice.actions;

export default favoriteListSlice.reducer;
