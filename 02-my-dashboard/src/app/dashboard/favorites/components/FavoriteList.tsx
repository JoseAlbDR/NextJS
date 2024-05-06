'use client';
import React from 'react';
import { PokemonGrid } from '../../pokemons';
import { useAppSelector } from '@/store';

const FavoriteList = () => {
  const favorites = useAppSelector((state) => state.favorites.favorites);

  const favoritesArray = Object.keys(favorites).map((key) => favorites[key]);

  return <PokemonGrid pokemons={favoritesArray} />;
};

export default FavoriteList;
