export const revalidate = 60;

import { Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { getProducts } from '@/lib';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    gender: Category;
  };
  searchParams: {
    [key: string]: string;
  };
}

const allowedParams = ['men', 'women', 'kid'];

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { gender } = params;
  const { page = 1 } = searchParams;

  if (!allowedParams.includes(gender)) notFound();

  // const showProducts = initialData.products.filter(
  //   (product) => product.gender === id
  // );

  const { products: showProducts, totalPages } = await getProducts({
    page: +page || 1,
    gender,
  });

  const titles: Record<Category, string> = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
    unisex: 'Todos',
  };

  return (
    <div>
      <Title
        title={titles[gender]}
        subtitle={`Articulos de ${titles[gender]}`}
        className="mb-2"
      />
      <ProductGrid products={showProducts} />
      <Pagination currentPage={+page} totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
