import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SimplePokemon } from '@/app/dashboard/pokemons';

interface FavoritesState {
  [key: string]: SimplePokemon;
}

const initialState: FavoritesState = {
  '1': { id: '1', name: 'bulbasaur' },
  '3': { id: '3', name: 'bulbasaur' },
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<SimplePokemon>) => {
      const pokemon = action.payload;
      const { id } = pokemon;

      if (!!state[id]) {
        delete state[id];
        return;
      }

      state[id] = pokemon;
    },
  },
});

export const { toggleFavorite } = favoritesSlice.actions;

export default favoritesSlice.reducer;
