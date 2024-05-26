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
import { title } from 'process';
import AddToCart from './ui/AddToCart';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    slug: string;
  };
}

export const generateMetadata = async ({ params }: Props) => {
  try {
    const product = await getProduct({ slug: params.slug });

    if (!product) throw new Error('No se encuentra el producto');

    return {
      title: product?.title,
      description: product?.description,
      openGraph: {
        title: product?.title,
        description: product?.description,
        images: [`/proucts/${product?.images[1]}`],
      },
    };
  } catch (error) {
    return {
      title: 'Producto',
      description: 'Página de producto',
    };
  }
};

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
        <p className="text-lg mb-5">{currencyFormat(product.price)}</p>

        <AddToCart product={product} />

        {/* Description */}
        <h3 className="font-bold text-sm">Descripción</h3>
        <p className="font-light">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductPage;
