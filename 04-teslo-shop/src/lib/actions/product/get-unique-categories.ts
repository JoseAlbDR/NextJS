'use server';

import prisma from '@/lib/db';

export const getUniqueCategories = async () => {
  return await prisma.category.findMany({
    select: {
      name: true,
    },
    distinct: ['name'],
  });
};
