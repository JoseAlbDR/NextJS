'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/db';
import { revalidatePath } from 'next/cache';

export const changeUserRole = async (
  userId: string,
  role: 'admin' | 'user'
) => {
  const session = await auth();

  if (!session?.user || session.user.role !== 'admin')
    throw new Error('No hay usuario o el usuario no es administrador');

  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        role,
      },
    });

    revalidatePath('/admin/users');
  } catch (error: any) {
    console.log(error);
    return {
      ok: false,
      message: error.message,
    };
  }
};
