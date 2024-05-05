'use client';
import { useAppDispatch, useAppSelector } from '@/store';
import { toggleFavorite } from '@/store/favorites/favoritesSlice';

import React from 'react';
import { IoHeart, IoHeartOutline } from 'react-icons/io5';
import { SimplePokemon } from '../interfaces/simple-pokemon';

interface Props {
  pokemon: SimplePokemon;
}

const FavoriteCTA = ({ pokemon: { id, name } }: Props) => {
  const pokemon = useAppSelector((state) => state.favorites[id]);
  const dispatch = useAppDispatch();

  const onToggle = () => {
    dispatch(toggleFavorite({ id, name }));
  };
  return (
    <div
      onClick={onToggle}
      className="px-4 py-2 hover:bg-gray-100 flex justify-center items-center cursor-pointer"
    >
      <div className="text-red-600">
        {!!pokemon ? <IoHeart /> : <IoHeartOutline />}
      </div>
      <div className="pl-3">
        <p className="text-sm font-medium text-gray-800 leading-none">
          {!!pokemon ? 'Es favorito' : ' No es Favorito'}
        </p>
        <p className="text-xs text-gray-500">Click para cambiar</p>
      </div>
    </div>
  );
};

export default FavoriteCTA;
