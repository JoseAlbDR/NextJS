'use client';
import { useCartStore } from '@/store';
import React, { useEffect, useState } from 'react';

import { FaSpinner } from 'react-icons/fa';
import ProductItem from './ProductItem';

const ProductList = () => {
  const [loaded, setIsLoaded] = useState(false);
  const products = useCartStore((state) => state.cart);

  useEffect(() => {
    setIsLoaded(true);
  }, [loaded, products]);

  return !loaded ? (
    <FaSpinner size={50} className="animate-spin" />
  ) : (
    products.map((product) => (
      <div key={`${product.slug} + ${product.size}`} className="flex mb-5">
        <ProductItem product={product} />
      </div>
    ))
  );
};

export default ProductList;
