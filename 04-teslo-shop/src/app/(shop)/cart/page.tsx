import React from 'react';
import { Title } from '@/components';
import { initialData } from '@/seed/seed';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import ProductList from './ui/ProductList';
import { Checkout } from './ui';

const products = [
  initialData.products[0],
  initialData.products[1],
  initialData.products[2],
];

const CartPage = () => {
  if (products.length === 0) redirect('/empty');

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
