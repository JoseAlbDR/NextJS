import React from 'react';

import { PokemonGrid } from '@/app/dashboard/pokemons';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Favoritos',
  description: 'Lista de pokemons favoritos',
};

const PokemonsPage = async () => {
  return (
    <div className="flex flex-col">
      <span className="text-5xl my-4">
        Listado de Pokemons favoritos{' '}
        <small className="text-blue-500">estático</small>
        <PokemonGrid pokemons={[]} />
      </span>
    </div>
  );
};

export default PokemonsPage;
