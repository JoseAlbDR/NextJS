'use server';

import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const toggleTodo = async (
  id: string,
  complete: boolean
): Promise<Todo | null> => {
  try {
    const todo = await prisma.todo.findUnique({ where: { id } });

    if (!todo) throw `Todo con id ${id} no encontrado`;

    const updatedTodo = await prisma.todo.update({
      where: { id },
      data: {
        complete: !complete,
      },
    });

    // Revalidar caché para los updates en tiempo real
    revalidatePath('/dashboard/server-todos');
    return updatedTodo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
