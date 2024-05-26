export const revalidate = 60;

import { Pagination, ProductGrid, Title } from '@/components';
import { getProducts } from '@/lib';
import { redirect } from 'next/navigation';

interface Props {
  searchParams: { [key: string]: string };
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? +searchParams.page : 1;

  const { products, totalPages, currentPage } = await getProducts({
    page,
  });

  if (products.length === 0) redirect('/');

  return (
    <main className="">
      <Title title="Tienda" subtitle="Todos los productos" className="mb-2" />
      <ProductGrid products={products} />
      <Pagination totalPages={totalPages} currentPage={currentPage || 1} />
    </main>
  );
}
