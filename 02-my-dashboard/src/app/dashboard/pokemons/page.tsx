import React from 'react';
import { PokemonsResponse } from '../../pokemons/interfaces/pokemons-response';
import { SimplePokemon } from '@/app/pokemons';
import PokemonCard from './components/PokemonCard';
import PokemonGrid from './components/PokemonGrid';

const getPokemons = async (
  limit = 20,
  offset = 0
): Promise<SimplePokemon[]> => {
  const data: PokemonsResponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`
  ).then((res) => res.json());

  const pokemons = data.results.map((pokemon) => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name,
  }));

  return pokemons;
};

const PokemonsPage = async () => {
  const pokemons = await getPokemons(151);

  return (
    <div className="flex flex-col">
      <span className="text-5xl my-4">
        Listado de Pokemons <small>estático</small>
        <PokemonGrid pokemons={pokemons} />
      </span>
    </div>
  );
};

export default PokemonsPage;
