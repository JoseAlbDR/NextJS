import { Title } from '@/components';
import { getProduct } from '@/lib/actions';
import ProductForm from './ui/ProductForm';
import { notFound } from 'next/navigation';
import { getUniqueCategories } from '@/lib/actions/product/get-unique-categories';

interface Props {
  params: {
    slug: string;
  };
}

const ProductPage = async ({ params }: Props) => {
  const { slug } = params;

  const product = await getProduct({ slug });
  const categories = await getUniqueCategories();

  if (!product) notFound();

  return (
    <>
      <Title title={slug} />
      <ProductForm product={product} categories={categories} />
    </>
  );
};

export default ProductPage;
