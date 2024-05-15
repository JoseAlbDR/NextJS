import { notFound } from 'next/navigation';
import React from 'react';

interface Props {
  params: {
    id: string;
  };
}

const allowedParams = ['men', 'women', 'kids'];

const CategoryPage = ({ params }: Props) => {
  const { id } = params;

  if (!allowedParams.includes(id)) notFound();

  return <div>CategoryPage</div>;
};

export default CategoryPage;
