import { ValidSizes, ValidTypes, initialData } from './seed';
import prisma from '../lib/db';

interface Category {
  name: string;
}

interface Product {
  title: string;
  description: string;
  inStock: number;
  price: number;
  sizes: ValidSizes[];
  slug: string;
  tags: string[];
  categoryId: string;
  gender: 'men' | 'women' | 'kid' | 'unisex';
}

interface Image {
  url: string;
  productId: string;
}

const main = async () => {
  await prisma.$transaction([
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
  ]);

  const { categories } = initialData.products.reduce(
    (acc, item) => {
      const category: Category = { name: item.type };
      if (!acc.categories.some((c) => c.name === category.name))
        acc.categories.push(category);

      return acc;
    },
    {
      categories: [] as Category[],
    }
  );

  await prisma.category.createMany({ data: categories });

  const categoryMap = (await prisma.category.findMany()).reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {} as Record<string, string>);

  const products: Product[] = initialData.products.map((product) => {
    const { images, type, ...rest } = product;
    return {
      ...rest,
      categoryId: categoryMap[product.type],
    };
  });

  await prisma.product.createMany({ data: products });

  const insertedProducts = await prisma.product.findMany();

  const images: Image[] = insertedProducts.reduce((acc, product) => {
    initialData.products
      .find((p) => p.slug === product.slug)
      ?.images.forEach((image) => {
        acc.push({
          url: image,
          productId: product.id,
        });
      });

    return acc;
  }, [] as Image[]);

  await prisma.productImage.createMany({ data: images });

  console.log('Seed ejecutada');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
