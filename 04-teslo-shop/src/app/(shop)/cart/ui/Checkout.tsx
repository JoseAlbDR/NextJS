'use client';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Checkout = () => {
  const [loaded, setLoaded] = useState(false);

  const { subtotal, total, tax, totalProducts } = useCartStore((state) =>
    state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      {!loaded ? (
        <div className="flex justify-center items-center h-full min-h-[240px]">
          <FaSpinner size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl mb-2">Resumen de compra</h2>
          <div className="grid grid-cols-2">
            <span>No. Productos</span>
            <span className="text-right">{totalProducts} artículos</span>
            <span>Subtotal</span>
            <span className="text-right">{currencyFormat(subtotal)}</span>
            <span>IVA (21%)</span>
            <span className="text-right ">{currencyFormat(tax)}</span>
            <span className="mt-5 text-2xl">Total</span>
            <span className="text-right mt-5 text-2xl">
              {currencyFormat(total)}
            </span>
          </div>
          <div className="mt-5 mb-2 w-full">
            <Link
              href="/checkout/address"
              className="flex justify-center btn-primary mt-5"
            >
              Finalizar Compra
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
