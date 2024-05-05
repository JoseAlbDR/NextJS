import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/app/dashboard/pokemons';

interface FavoritesState {
  [key: string]: SimplePokemon;
}

const getInitialState = (): FavoritesState => {
  const favorites = JSON.parse(localStorage.getItem('favorites') ?? '{}');
  return favorites;
};

const initialState: FavoritesState = {
  ...getInitialState(),
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state[id]) delete state[id];
      else state[id] = pokemon;

      localStorage.setItem('favorites', JSON.stringify(state));
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
