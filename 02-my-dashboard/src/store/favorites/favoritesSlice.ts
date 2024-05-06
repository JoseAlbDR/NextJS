import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/app/dashboard/pokemons';

interface FavoritesState {
  favorites: {
    [key: string]: SimplePokemon;
  };
}

const getInitialState = (): FavoritesState => {
  const favorites = JSON.parse(localStorage?.getItem('favorites') ?? '{}');
  return favorites;
};

const initialState: FavoritesState = {
  favorites: {},
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    setFavoritePokemons: (
      state,
      action: PayloadAction<{ [key: string]: SimplePokemon }>
    ) => {
      state.favorites = action.payload;
    },
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state.favorites[id]) delete state.favorites[id];
      else state.favorites[id] = pokemon;

      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
  },
});

export const { toggleFavorite, setFavoritePokemons } = favoritesSlice.actions;

export default favoritesSlice.reducer;
