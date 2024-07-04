'use server';

import { auth } from '@/auth.config';
import { Size } from '@/interfaces';
import prisma from '@/lib/db';
import { MutateProductType } from '@/lib/types';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(2))),
  inStock: z.coerce
    .number()
    .min(0)
    .transform((val) => Number(val.toFixed(0))),
});

export const mutateProduct = async (data: MutateProductType, slug: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return {
      ok: false,
      message: 'No autorizado',
    };

  try {
    const upsertedProduct = await prisma.product.upsert({
      where: {
        slug,
      },
      update: {
        ...data,
        slug: data.title?.toLowerCase().replace(/ /g, '_'),
        category: {
          connect: {
            name: data.category,
          },
        },
      },
      create: {
        ...data,
        inStock: 0,
        slug: data.title?.toLowerCase().replace(/ /g, '_'),
        category: {
          connect: {
            name: data.category,
          },
        },
      },
    });

    return {
      ok: true,
      product: upsertedProduct,
    };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: error.message ? error.message : 'Error mutando el producto',
    };
  }
};

export const changeProductSizes = async (size: Size, slug: string) => {
  const product = await prisma.product.findUnique({
    where: {
      slug,
    },
  });
  if (!product) throw new Error('No se encontro el producto');
  const sizeArray = product.sizes.map((s) => s);
  const updatedSizes = sizeArray.includes(size)
    ? sizeArray.filter((s) => s !== size)
    : [...sizeArray, size];

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        slug,
      },
      data: {
        sizes: updatedSizes,
      },
    });

    revalidatePath(`/admin/product/${slug}`);
    return {
      ok: true,
      product: updatedProduct,
    };
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message
        ? error.message
        : 'Error cambiando las tallas del producto',
    };
  }
};
