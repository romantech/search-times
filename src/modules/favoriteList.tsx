interface FavoriteListState {
  favorites: Article[];
}

type FavoriteListAction =
  | ReturnType<typeof addToFavorites>
  | ReturnType<typeof removeFromFavorites>;

const initialState: FavoriteListState = {
  favorites: [],
};

export const ADD_FAVORITES = 'favoriteList/ADD_FAVORITES';
export const REMOVE_FAVORITES = 'favoriteList/REMOVE_FAVORITES';

export const addToFavorites = (article: Article) =>
  ({
    type: ADD_FAVORITES,
    payload: article,
  } as const);

export const removeFromFavorites = (id: string) =>
  ({
    type: REMOVE_FAVORITES,
    payload: id,
  } as const);

export default function reducer(
  // eslint-disable-next-line default-param-last
  state = initialState,
  action: FavoriteListAction,
): FavoriteListState {
  switch (action.type) {
    case ADD_FAVORITES:
      return {
        ...state,
        favorites: [action.payload, ...state.favorites],
      };
    case REMOVE_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(el => el._id !== action.payload),
      };
    default:
      return state;
  }
}
