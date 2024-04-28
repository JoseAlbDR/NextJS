import Image from 'next/image';
import React from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a';

const fetchDrinks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Drinks');
  const data = await response.json();
  return data;
};

const DrinksPage = async () => {
  const data = await fetchDrinks();
  return (
    <h1 className="flex flex-wrap gap-4 items-center justify-center w-full">
      {data.drinks.map(
        (drink: {
          isDrink: number;
          strDrinkThumb: string;
          strDrink: string;
        }) => {
          return (
            <div className="card" key={drink.isDrink}>
              <Image
                src={drink.strDrinkThumb}
                alt="drink"
                width={275}
                height={200}
                className="image-full"
              />
              <p>{drink.strDrink}</p>
            </div>
          );
        }
      )}
    </h1>
  );
};

export default DrinksPage;
