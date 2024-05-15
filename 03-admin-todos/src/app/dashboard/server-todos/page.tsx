import { auth } from '@/app/auth';
import { NewTodo, TodosGrid } from '@/todos';
import { getTodos } from '@/todos/actions/todo-actions';
import { Todo } from '@prisma/client';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Listado de Todos con server actions',
  description: 'SEO Title',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const ServerTodosPage = async () => {
  // const todos = await fetch('http://localhost:3000/api/todos', {
  //   // cache: 'no-store',
  //   next: { revalidate: 0 },
  // }).then((res) => res.json());

  const session = await auth();

  let todos: Todo[] = [];

  if (session && session.user) todos = await getTodos(session.user.id!);



  // const deleteCompleted = async () => {
  //   'use server';
  //   await prisma.todo.deleteMany({ where: { complete: true } });
  // };

  return (
    <>
      <h2 className="text-4xl">Server Actions</h2>
      <div className="flex flex-col gap-4 p-4">
        <div className="w-full mx-4">
          <NewTodo />
        </div>
        <TodosGrid todos={todos} />
      </div>
    </>
  );
};

export default ServerTodosPage;
