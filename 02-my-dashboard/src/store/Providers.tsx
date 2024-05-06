'use client';
import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { store, useAppSelector } from '@/store';
import { useEffect } from 'react';
import { setFavoritePokemons } from './favorites/favoritesSlice';

const Providers = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites') ?? '{}');

    store.dispatch(setFavoritePokemons(favorites));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
