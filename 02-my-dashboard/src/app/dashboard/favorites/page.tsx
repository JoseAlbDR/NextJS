import React from 'react';
import { Metadata } from 'next';
import FavoriteList from './components/FavoriteList';

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Lista de pokemons favoritos',
};

const PokemonsPage = () => {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-4">
        Listado de Pokemons favoritos{' '}
        <small className="text-blue-500">estático</small>
        <FavoriteList />
      </span>
    </div>
  );
};

export default PokemonsPage;
