'use server';

import { revalidatePath } from 'next/cache';
import prisma from './db';

export const createTaskAction = async (data: FormData) => {
  const content = data.get('content') as string;

  await prisma.task.create({ data: { content } });
  revalidatePath('/tasks');
};

export const getAllTasksAtion = async () => {
  const tasks = await prisma.task.findMany({
    orderBy: { createdAt: 'desc' },
  });
  return tasks;
};
