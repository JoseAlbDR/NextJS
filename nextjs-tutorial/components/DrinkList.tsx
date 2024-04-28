import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Drink {
  idDrink: string;
  strDrinkThumb: string;
  strDrink: string;
}

const DrinkList = ({ data }: { data: { drinks: Drink[] } }) => {
  return (
    <ul className="menu menu-vertical pl-0">
      {data.drinks.map((drink: Drink) => {
        return (
          <li className="card" key={drink.idDrink}>
            <Image
              src={drink.strDrinkThumb}
              alt="drink"
              width={275}
              height={200}
              className="image-full"
            />
            <Link href={`/drinks/${drink.idDrink}`}>{drink.strDrink}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default DrinkList;
