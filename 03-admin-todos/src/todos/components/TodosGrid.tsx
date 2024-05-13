import React from 'react';

export interface Todo {
  id: string;
  description: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  todos: Todo[];
}
const TodosGrid = ({ todos }: Props) => {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {todos.map((todo) => (
        <div
          key={todo.id}
          className="flex flex-col px-4 py-6 border border-blue-600 rounded-md shadow-md"
        >
          <span className="text-xl">{todo.id}</span>
          <span className="text-lg">{todo.description}</span>
          <span className="text-md">
            {new Date(todo.createdAt).toLocaleDateString()}
          </span>
          <span
            className={`${todo.complete ? 'text-green-600' : 'text-red-500'}`}
          >
            {todo.complete ? 'Completado' : 'Sin completar'}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TodosGrid;
