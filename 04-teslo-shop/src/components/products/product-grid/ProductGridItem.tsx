'use client';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  product: Product;
}

const ProductGridItem = ({ product }: Props) => {
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded-md"
          width={450}
          height={450}
          onMouseEnter={() => setDisplayImage(product.images[1])}
          onMouseLeave={() => setDisplayImage(product.images[0])}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-500">
          {product.title}
        </Link>
        <span className="text-md font-bold">
          {currencyFormat(product.price)}
        </span>
      </div>
    </div>
  );
};

export default ProductGridItem;
