'use server';
import { Product, Type } from '@/interfaces';
import prisma from './db';
import { Prisma } from '@prisma/client';

interface GetProductsPayload {
  page?: number;
  limit?: number;
  gender?: 'men' | 'women' | 'kid' | 'unisex';
}

export const getProducts = async ({
  page = 1,
  limit = 12,
  gender,
}: GetProductsPayload) => {
  if (isNaN(Number(page))) page = 1;
  if (isNaN(Number(limit))) limit = 12;
  if (page < 1) page = 1;
  if (limit < 1) limit = 12;

  try {
    const skip = (page - 1) * limit;

    let whereClause: Prisma.ProductWhereInput = {};

    if (gender) whereClause = { ...whereClause, gender };

    const [data, totalPages] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereClause,
        include: {
          Images: { select: { url: true } },
          Category: { select: { name: true } },
        },
        take: limit,
        skip,
        orderBy: { title: 'asc' },
      }),
      prisma.product.count({ where: whereClause }),
    ]);

    const products = data.reduce((acc, item) => {
      const product: Product = {
        ...item,
        images: item.Images.map((image) => image.url),
        type: item.Category.name as Type,
      };
      acc.push(product);
      return acc;
    }, [] as Product[]);

    return {
      products,
      totalPages: Math.ceil(totalPages / limit),
    };
  } catch (error) {
    console.log(error);
    return { products: [], totalPages: 0 };
  }
};
