import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import FavoriteCTA from './FavoriteCTA';

interface Props {
  name: string;
  id: string;
}

const PokemonCard = ({ id, name }: Props) => {
  return (
    <div className="mx-auto right-0 mt-2 w-60">
      <div className="bg-white rounded overflow-hidden shadow-lg">
        <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
          <Image
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
            alt={name}
            height={100}
            width={100}
          />
          <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">
            {name}
          </p>
          <div className="mt-5">
            <Link
              href={`/dashboard/pokemon/${name}`}
              className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
            >
              Detalles
            </Link>
          </div>
        </div>
        <div className="border-b">
          <FavoriteCTA pokemon={{ id, name }} />
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
