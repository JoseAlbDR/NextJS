import { SizeSelector } from '@/components';
import { tittleFont } from '@/config/fonts';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = ({ params }: Props) => {
  const { slug } = params;
  const product = initialData.products.find((product) => product.slug === slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3">
      <div className="col-span-1 md:col-span-2">
        <h1>Hello there</h1>
      </div>
      <div className="col-span-1 px-5 ">
        <h1 className={`${tittleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        <p className="text-lg mb-5">${product.price}</p>

        {/* Tallas */}
        <SizeSelector
          avaliableSizes={product.sizes}
          selectedSize={product.sizes[0]}
        />
        {/* Cantidad */}

        {/* Button */}
        <button className="btn-primary my-5">Agregar al carrito</button>
        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
