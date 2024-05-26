'use client';
import { useCartStore } from '@/store';
import Image from 'next/image';
import React from 'react';

const ProductList = () => {
  const products = useCartStore((state) => state.cart);

  return products.map((product) => (
    <div key={product.slug} className="flex mb-5">
      <Image
        src={`/products/${product.image}`}
        width={100}
        height={100}
        style={{ width: 100, height: 100 }}
        alt={product.title}
        className="mr-5 rounded"
      />
      <div>
        <p>{product.title}</p>
        <p>${product.price}</p>
        {/* <QuantitySelector quantity={} stock={product.inStock}/> */}
        <button className="underline mt-3">Remover</button>
      </div>
    </div>
  ));
};

export default ProductList;
