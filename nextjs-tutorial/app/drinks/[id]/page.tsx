import DrinkDetail from '@/components/DrinkDetail';
import { Drink } from '@/components/DrinkList';

import React from 'react';

const page = async ({ params }: { params: { id: string } }) => {
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${params.id}`
  );

  const data = await response.json();

  const drinks: Drink[] = data.drinks;

  const drink = drinks.at(0);

  if (!drink) return;

  return <DrinkDetail drink={drink} />;
};

export default page;
