'use server';

import { auth } from '@/auth.config';
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
        category: {
          connect: {
            name: data.category,
          },
        },
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
      message: error.message ? error.message : 'Error actualizando el producto',
    };
  }
};
