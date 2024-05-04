import { PokemonDetail } from '@/app/dashboard/pokemons/interfaces/pokemon-detail';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoHeartOutline } from 'react-icons/io5';

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
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>
          <div className="mt-5">
            <Link
              href={`dashboard/pokemons/${id}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Detalles
            </Link>
          </div>
        </div>
        <div className="border-b">
          <Link
            href="/dashboard/main"
            className="px-4 py-2 hover:bg-gray-100 flex justify-center items-center"
          >
            <div className="text-red-600">
              <IoHeartOutline />
            </div>
            <div className="pl-3">
              <p className="text-sm font-medium text-gray-800 leading-none">
                No es Favorito
              </p>
              <p className="text-xs text-gray-500">View your campaigns</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;