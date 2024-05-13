import prisma from '@/app/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

const RestTodosPage = async () => {
  const todos = await fetch('http://localhost:3000/api/todos', {
    next: { revalidate: 0 },
  }).then((res) => res.json());

  const deleteCompleted = async () => {
    'use server';
    await prisma.todo.deleteMany({ where: { complete: true } });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="w-full mx-4">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </div>
  );
};

export default RestTodosPage;
