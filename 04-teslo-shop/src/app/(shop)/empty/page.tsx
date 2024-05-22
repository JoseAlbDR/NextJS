import Link from 'next/link';
import React from 'react';
import { IoCartOutline } from 'react-icons/io5';

const EmptyPage = () => {
  return (
    <div className="flex justify-center items-center h-[800px]">
      <IoCartOutline size={100} className="mx-5" />
      <div className="flex flex-col items-center">
        <h1 className="text-xl font-semibold">Tu carrito está vacio</h1>
        <Link href="/" className="underline text-blue-500 mt-2 text-4xl">
          Ir a comprar
        </Link>
      </div>
    </div>
  );
};

export default EmptyPage;
