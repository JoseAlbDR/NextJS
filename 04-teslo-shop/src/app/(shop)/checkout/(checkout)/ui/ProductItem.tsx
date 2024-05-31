'use client';

import { CartProduct } from '@/interfaces';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import React from 'react';

interface Props {
  product: CartProduct;
}

const ProductItem = ({ product }: Props) => {
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
        <span>
          {product.size} - {product.title}
        </span>
        <p>
          {currencyFormat(product.price)} x {product.quantity}
        </p>
        <p className="font-bold">
          Subtotal: {currencyFormat(product.price * product.quantity)}
        </p>
      </div>
    </>
  );
};

export default ProductItem;
