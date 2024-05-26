'use client';
import { useCartStore } from '@/store';
import Link from 'next/link';
import React from 'react';

const Checkout = () => {
  const totalProducts = +useCartStore((state) => state.getTotalItems());
  const totalPrice = +useCartStore((state) => state.getTotalPrice()).toFixed(2);
  const tax = (totalPrice * 0.21).toFixed(2);

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2">Resumen de compra</h2>
      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{totalProducts} artículos</span>
        <span>Subtotal</span>
        <span className="text-right">${totalPrice}</span>
        <span>IVA (21%)</span>
        <span className="text-right ">${tax}</span>
        <span className="mt-5 text-2xl">Total</span>
        <span className="text-right mt-5 text-2xl">
          ${(Number(totalPrice) + Number(tax)).toFixed(2)}
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
    </div>
  );
};

export default Checkout;
