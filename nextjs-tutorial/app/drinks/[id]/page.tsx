import DrinkDetail from '@/components/DrinkDetail';
import { Drink } from '@/components/DrinkList';

import React from 'react';

const getSingleDrink = async (id: string) => {
  const res = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (!res.ok) throw new Error('Failed to fetch a drink...');
  return res.json();
};

const page = async ({ params }: { params: { id: string } }) => {
  const data = await getSingleDrink(params.id);

  const drinks: Drink[] = data.drinks;

  const drink = drinks.at(0);

  if (!drink) return;

  return <DrinkDetail drink={drink} />;
};

export default page;
