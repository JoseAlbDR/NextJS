import { Pagination, ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { getProducts } from '@/lib';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react';
import page from '../../../../../../nextjs-tutorial/app/drinks/[id]/page';

interface Props {
  params: {
    id: Category;
  };
  searchParams: {
    [key: string]: string;
  };
}

const allowedParams = ['men', 'women', 'kid'];

const CategoryPage = async ({ params, searchParams }: Props) => {
  const { id } = params;
  const { page = 1 } = searchParams;

  if (!allowedParams.includes(id)) notFound();

  // const showProducts = initialData.products.filter(
  //   (product) => product.gender === id
  // );

  const { products: showProducts, totalPages } = await getProducts({
    page: +page || 1,
    gender: id,
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
        title={titles[id]}
        subtitle={`Articulos de ${titles[id]}`}
        className="mb-2"
      />
      <ProductGrid products={showProducts} />
      <Pagination currentPage={+page} totalPages={totalPages} />
    </div>
  );
};

export default CategoryPage;
