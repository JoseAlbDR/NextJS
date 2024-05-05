import { PokemonCard, SimplePokemon } from '@/app/dashboard/pokemons';
import React from 'react';

interface Props {
  pokemons: SimplePokemon[];
}

const PokemonGrid = ({ pokemons }: Props) => {
  return pokemons.length === 0 ? (
    <div className="text-lg mt-4">Aun no hay ningún favoritos</div>
  ) : (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonGrid;
