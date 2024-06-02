import { ValidSizes, ValidTypes, initialData, countries } from './seed';
import prisma from '../lib/db';

interface Category {
  name: ValidTypes;
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
    prisma.orderAddress.deleteMany(),
    prisma.orderItem.deleteMany(),
    prisma.order.deleteMany(),
    prisma.address.deleteMany(),
    prisma.productImage.deleteMany(),
    prisma.product.deleteMany(),
    prisma.category.deleteMany(),
    prisma.user.deleteMany(),
    prisma.country.deleteMany(),
  ]);

  // const { categories } = initialData.products.reduce(
  //   (acc, item) => {
  //     const category: Category = { name: item.type };
  //     if (!acc.categories.some((c) => c.name === category.name))
  //       acc.categories.push(category);

  //     return acc;
  //   },
  //   {
  //     categories: [] as Category[],
  //   }
  // );

  // categories.push({ name: 'pants' }

  await prisma.country.createMany({
    data: countries,
  });

  await prisma.user.createMany({
    data: initialData.users,
  });

  const cats = ['hoodies', 'pants', 'hats', 'shirts'];

  const categories = cats.reduce((acc, item) => {
    acc.push({ name: item });

    return acc;
  }, [] as { name: string }[]);

  await prisma.category.createMany({ data: categories });

  const categoryMap = (await prisma.category.findMany()).reduce((acc, cat) => {
    acc[cat.name] = cat.id;
    return acc;
  }, {} as Record<string, string>);

  initialData.products.map(async (product) => {
    const { images, type, ...rest } = product;
    await prisma.product.create({
      data: {
        ...rest,
        categoryId: categoryMap[type],
        images: {
          create: images.map((image) => ({
            url: image,
          })),
        },
      },
    });
  });

  console.log('Seed ejecutada');
};

(() => {
  if (process.env.NODE_ENV === 'production') return;

  main();
})();
