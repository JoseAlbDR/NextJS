import React from 'react';
const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.phps?f=a';

const fetchDrinks = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(url);
  if (!response.ok) throw new Error('Failed to fetch Drinks');
  const data = await response.json();
  return data;
};

const DrinksPage = async () => {
  const data = await fetchDrinks();
  console.log(data);
  return <h1 className="text-7xl">DrinksPage</h1>;
};

export default DrinksPage;
