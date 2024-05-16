import { ProductGrid, Title } from '@/components';
import { initialData } from '@/seed/seed';
import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const allowedParams = ['men', 'women', 'kid'];

const CategoryPage = ({ params }: Props) => {
  const { id } = params;

  if (!allowedParams.includes(id)) notFound();

  const showProducts = initialData.products.filter(
    (product) => product.gender === id
  );

  const titles: { [key: string]: string } = {
    men: 'Hombres',
    women: 'Mujeres',
    kid: 'Niños',
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
