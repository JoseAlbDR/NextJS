import React from 'react';
import { Title } from '@/components';
import Link from 'next/link';
import ProductList from './ui/ProductList';
import { Checkout } from './ui';

const CartPage = () => {
  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Carrito" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col my-6">
            <span className="text-xl">Agregar más items</span>
            <Link href="/" className="underline mb-5">
              Continuar Comprando
            </Link>
            <ProductList />
          </div>

          <Checkout />
        </div>
      </div>
    </div>
  );
};

export default CartPage;
