'use client';
import { useCartStore } from '@/store';
import { useAddressStore } from '@/store/address/address-store';
import { currencyFormat, sleep } from '@/utils';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

const Checkout = () => {
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);

  const { subtotal, total, tax, totalProducts } = useCartStore((state) =>
    state.getSummaryInformation()
  );
  const address = useAddressStore((state) => state.address);
  const cart = useCartStore((state) => state.cart);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((product) => ({
      id: product.id,
      size: product.size,
      quantity: product.quantity,
    }));

    console.log({ address, productsToOrder });
    await sleep(2000);

    setIsPlacingOrder(false);
  };

  return (
    <div className="bg-white rounded-xl h-fit">
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

          {/* <p className="text-red-500">Error de creacion</p> */}
          <div className="mt-5 mb-2 w-full">
            <button
              className={clsx('flex justify-center', {
                'btn-primary': !isPlacingOrder,
                'btn-disabled': isPlacingOrder,
              })}
              disabled={isPlacingOrder}
              onClick={onPlaceOrder}
            >
              Finalizar Compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Checkout;
