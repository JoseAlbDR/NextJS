'use server';
import { Product, Type } from '@/interfaces';
import prisma from './db';
import { Prisma } from '@prisma/client';
import { signIn, signOut } from '@/auth.config';
import { AuthError } from 'next-auth';
import { sleep } from '@/utils';

interface GetProductsPayload {
  page?: number;
  limit?: number;
  gender?: 'men' | 'women' | 'kid' | 'unisex';
}

interface SlugPayload {
  slug: string;
}

export const getStockBySlug = async ({ slug }: SlugPayload) => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      select: {
        inStock: true,
      },
    });
    if (!product) return 0;
    return product.inStock;
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener stock por slug');
  }
};

export const getProduct = async ({
  slug,
}: SlugPayload): Promise<Product | null> => {
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: {
        images: { select: { url: true } },
        category: { select: { name: true } },
      },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.images.map((image) => image.url),
      type: product.category.name as Type,
    };
  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug');
  }
};

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
          images: { select: { url: true } },
          category: { select: { name: true } },
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
        images: item.images.map((image) => image.url),
        type: item.category.name as Type,
      };
      acc.push(product);
      return acc;
    }, [] as Product[]);

    return {
      products,
      currentPage: page,
      totalPages: Math.ceil(totalPages / limit),
    };
  } catch (error) {
    console.log(error);
    return { products: [], totalPages: 0, currentPage: 1 };
  }
};

export const authenticate = async (
  prevState: string | undefined,
  formData: FormData,
  callbackUrl: string
) => {
  try {
    // await sleep(3000);
    await signIn('credentials', {
      ...Object.fromEntries(formData),
      redirectTo: callbackUrl || '/',
    });
    return undefined;
  } catch (error) {
    // console.log(error);
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Credenciales invalidas.';
        default:
          return 'Algo fue mal...inténtelo más tarde';
      }
    }
    throw error;
  }
};

export const logout = async (callbackUrl: string) => {
  await signOut({ redirectTo: callbackUrl || '/' });
};
