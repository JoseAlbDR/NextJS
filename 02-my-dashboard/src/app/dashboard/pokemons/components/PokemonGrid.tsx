import { SimplePokemon } from '@/app/pokemons';
import React from 'react';
import PokemonCard from './PokemonCard';

interface Props {
  pokemons: SimplePokemon[];
}

const PokemonGrid = ({ pokemons }: Props) => {
  return (
    <div className="flex flex-wrap gap-10 items-center justify-center">
      {pokemons.map((pokemon) => (
        <PokemonCard key={pokemon.id} id={pokemon.id} name={pokemon.name} />
      ))}
    </div>
  );
};

export default PokemonGrid;
