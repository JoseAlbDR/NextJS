'use server';

import prisma from '@/app/lib/prisma';
import { Todo } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export const createTodo = async (formData: FormData): Promise<Todo> => {
  const data = Object.fromEntries(formData);

  try {
    const todo = await prisma.todo.create({
      data: {
        description: data.description as string,
      },
    });

    revalidatePath('/dashboard/server-todos');
    return todo;
  } catch (error) {
    console.log(error);
    throw 'Error creando todo';
  }
};

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
