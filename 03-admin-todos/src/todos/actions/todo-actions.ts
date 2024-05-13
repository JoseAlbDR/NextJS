'use server';

import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';

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

    return updatedTodo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
