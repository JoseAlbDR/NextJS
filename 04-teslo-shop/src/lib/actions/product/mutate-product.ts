'use server';

import { auth } from '@/auth.config';
import { Size } from '@/interfaces';
import prisma from '@/lib/db';
import { MutateProductType } from '@/lib/types';
import { revalidatePath } from 'next/cache';

export const mutateProduct = async (data: MutateProductType, slug: string) => {
  const session = await auth();

  if (session?.user.role !== 'admin')
    return {
      ok: false,
      message: 'No autorizado',
    };

  try {
    const updatedProduct = await prisma.product.update({
      where: {
        slug,
      },
      data: {
        ...data,
        slug: data.title?.toLowerCase().replace(/ /g, '_'),
        category: {
          connect: {
            name: data.category,
          },
        },
      },
    });

    if (!updatedProduct) throw new Error('No se pudo actualizar el producto');

    return {
      ok: true,
      product: updatedProduct,
    };
  } catch (error: any) {
    console.log(error);

    return {
      ok: false,
      message: error.message ? error.message : 'Error actualizando el producto',
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
