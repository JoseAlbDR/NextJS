import { Product } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface Props {
  product: Product;
}

const ProductGridItem = ({ product }: Props) => {
  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${product.images[0]}`}
          alt={product.title}
          className="w-full object-cover"
          width={450}
          height={450}
        />
      </Link>
      <div className="p-4 flex flex-col">
        <Link href={`/product/${product.slug}`} className="hover:text-blue-500">
          {product.title}
        </Link>
        <span className="text-md font-bold">${product.price}</span>
      </div>
    </div>
  );
};

export default ProductGridItem;
