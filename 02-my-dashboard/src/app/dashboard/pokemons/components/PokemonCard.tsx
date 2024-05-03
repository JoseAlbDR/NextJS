import { PokemonDetail } from '@/app/pokemons/interfaces/pokemon-detail';
import Image from 'next/image';
import React from 'react';

interface Props {
  name: string;
  id: string;
}

const getPokemon = async (id: string): Promise<PokemonDetail> => {
  const pokemon: PokemonDetail = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${id}`
  ).then((res) => res.json());
  return pokemon;
};

const PokemonCard = async ({ id, name }: Props) => {
  const pokemon = await getPokemon(id);

  return (
    <div className="flex flex-col items-center justify-center p-6 border border-black shadow-md rounded-md">
      <Image
        src={pokemon.sprites.front_default}
        height={250}
        width={250}
        alt={name}
      />
      <span className="text-4xl capitalize">{name}</span>
    </div>
  );
};

export default PokemonCard;
