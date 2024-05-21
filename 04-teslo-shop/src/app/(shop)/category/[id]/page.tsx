import { ProductGrid, Title } from '@/components';
import { Category } from '@/interfaces';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: Category;
  };
}

const allowedParams = ['men', 'women', 'kid'];

const CategoryPage = ({ params }: Props) => {
  const { id } = params;

  if (!allowedParams.includes(id)) notFound();

  const showProducts = initialData.products.filter(
    (product) => product.gender === id
  );

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
    </div>
  );
};

export default CategoryPage;
