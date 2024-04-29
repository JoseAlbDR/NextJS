'use server';

import prisma from './db';

export const createTaskAction = async (data: FormData) => {
  const content = data.get('content') as string;

  await prisma.task.create({ data: { content } });
};
