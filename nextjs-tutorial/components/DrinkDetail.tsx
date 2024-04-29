import React from 'react';
import { Drink } from './DrinkList';
import Image from 'next/image';
import Link from 'next/link';

const DrinkDetail = ({ drink }: { drink: Drink }) => {
  return (
    <li className="card" key={drink?.idDrink}>
      <Image
        src={drink?.strDrinkThumb}
        alt="drink"
        width={275}
        height={200}
        className="image-full"
      />
      <Link href={`/drinks/${drink?.idDrink}`}>{drink?.strDrink}</Link>
      <Link href="/drinks" className="btn btn-primary">
        Go Back
      </Link>
    </li>
  );
};

export default DrinkDetail;
