import { CartCounter } from '@/app/components/shopping-cart';
import { Metadata } from 'next';
import React, { useState } from 'react';

export const metadata: Metadata = {
  title: 'Counter page',
  description: 'Un simple contador',
};

const CounterPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      <CartCounter />
    </div>
  );
};

export default CounterPage;
