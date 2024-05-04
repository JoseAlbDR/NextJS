import React from 'react';
import { PokemonDetail } from '@/app/dashboard/pokemons';
import { Metadata } from 'next';

interface Props {
  params: { id: string };
}

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id, name } = await getPokemon(params.id);

  return {
    title: `#${id} - ${name}`,
    description: `Página pokemon ${name}`,
  };
};

const getPokemon = async (id: string): Promise<PokemonDetail> => {
  const pokemon: PokemonDetail = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`,
    { cache: 'force-cache' }
  ).then((res) => res.json());
  return pokemon;
};

const PokemonPage = async ({ params }: Props) => {
  const pokemon = await getPokemon(params.id);

  return <div>{pokemon.name}</div>;
};

export default PokemonPage;
