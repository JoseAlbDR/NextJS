'use client';
import { QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  product: CartProduct;
}

const ProductItem = ({ product }: Props) => {
  const changeProductQuantity = useCartStore(
    (state) => state.changeProductQuantity
  );
  const removeProductFromCart = useCartStore(
    (state) => state.removeProductFromCart
  );

  return (
    <>
      <Image
        src={`/products/${product.image}`}
        width={100}
        height={100}
        style={{ width: 100, height: 100 }}
        alt={product.title}
        className="mr-5 rounded"
      />
      <div className="flex flex-col gap-2">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-500 underline hover:cursor-pointer"
        >
          {product.size} - {product.title}
        </Link>
        <p>
          {currencyFormat(product.price)} x {product.quantity}
        </p>

        <QuantitySelector
          quantity={product.quantity}
          onQuantityChanged={(value) => changeProductQuantity(product, value)}
        />
        <button
          className="underline mt-3 self-start"
          onClick={() => removeProductFromCart(product)}
        >
          Remover
        </button>
      </div>
    </>
  );
};

export default ProductItem;
