import { auth } from '@/app/auth';
import prisma from '@/lib/prisma';
import { NewTodo, TodosGrid } from '@/todos';
import { getTodos } from '@/todos/actions/todo-actions';
import { Todo } from '@prisma/client';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

const RestTodosPage = async () => {
  // const todos = await fetch('http://localhost:3000/api/todos', {
  //   // cache: 'no-store',
  //   next: { revalidate: 0 },
  // }).then((res) => res.json());

  // const deleteCompleted = async () => {
  //   'use server';
  //   await prisma.todo.deleteMany({ where: { complete: true } });
  // };

  const session = await auth();

  let todos: Todo[] = [];

  if (session && session.user) todos = await getTodos(session.user.id!);

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
