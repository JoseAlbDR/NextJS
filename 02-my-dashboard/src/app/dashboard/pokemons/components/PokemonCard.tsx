import { PokemonDetail } from '@/app/pokemons/interfaces/pokemon-detail';
import Image from 'next/image';
import Link from 'next/link';
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
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={pokemon.sprites.front_default}
            alt={name}
            height={100}
            width={100}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50">{name}</p>
          <div className="mt-5">
            <Link
              href="#"
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Detalles
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
