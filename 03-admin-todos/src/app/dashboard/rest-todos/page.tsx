import { TodosGrid } from '@/todos';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Listado de Todos',
  description: 'SEO Title',
};

const RestTodosPage = async () => {
  const todos = await fetch('http://localhost:3000/api/todos').then((res) =>
    res.json()
  );

  return <>{<TodosGrid todos={todos} />}</>;
};

export default RestTodosPage;
