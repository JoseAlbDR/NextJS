'use client';
import { QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { useCartStore } from '@/store';
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
      <div>
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-500 underline hover:cursor-pointer"
        >
          {product.title}
        </Link>
        <p>
          ${product.price} x {product.quantity}
        </p>
        <p>{product.size}</p>

        <QuantitySelector
          quantity={product.quantity}
          onQuantityChanged={(value) => changeProductQuantity(product, value)}
        />
        <button className="underline mt-3">Remover</button>
      </div>
    </>
  );
};

export default ProductItem;
