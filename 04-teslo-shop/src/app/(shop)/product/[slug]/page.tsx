export const revalidate = 10080; // 1 week
import React, { Suspense } from 'react';
import {
  MobileSlideShow,
  ProductSlideShow,
  QuantitySelector,
  SizeSelector,
  StockLabel,
  StockLabelSkeleton,
} from '@/components';
import { tittleFont } from '@/config/fonts';
import { getProduct } from '@/lib/actions';
import { notFound } from 'next/navigation';

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;
  const product = await getProduct({ slug });

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid md:grid-cols-3 gap-3 m">
      <div className="col-span-1 md:col-span-2">
        {/* Mobile Slide Show */}
        <MobileSlideShow
          images={product.images}
          title={product.title}
          className="block md:hidden"
        />
        {/* Slide Show */}
        <ProductSlideShow
          images={product.images}
          title={product.title}
          className="hidden md:block"
        />
      </div>
      <div className="col-span-1 px-5 ">
        <Suspense fallback={<StockLabelSkeleton />}>
          <StockLabel slug={product.slug} />
        </Suspense>

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
        <h3 className="font-semibold mb-4">Cantidad</h3>
        <QuantitySelector selectedQuantity={1} />
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
