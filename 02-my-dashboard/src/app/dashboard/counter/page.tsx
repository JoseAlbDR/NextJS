import { CartCounter } from '@/components/shopping-cart';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Counter page',
  description: 'Un simple contador',
};

const CounterPage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <span>Productos en el carrito</span>
      <CartCounter />
    </div>
  );
};

export default CounterPage;
