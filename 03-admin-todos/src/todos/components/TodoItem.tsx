'use client';
import React from 'react';
import { Todo } from './TodosGrid';
import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | null>;
}

const TodoItem = ({ todo, toggleTodo }: Props) => {
  return (
    <div
      key={todo.id}
      className={`card ${todo.complete ? 'todoDone' : 'todoPending'}`}
    >
      <div
        onClick={() => toggleTodo(todo.id, todo.complete)}
        className={`card-body sm:flex-row hover:bg-opacity-60 cursor-pointer w-full ${
          todo.complete ? 'bg-blue-100' : 'bg-red-100'
        }`}
      >
        {todo.complete ? (
          <IoCheckboxOutline size={30} />
        ) : (
          <IoSquareOutline size={30} />
        )}
        <p className="text-lg">{todo.description}</p>
        <p className="text-md">
          {new Date(todo.createdAt).toLocaleDateString()}
        </p>
        <span
          className={`${todo.complete ? 'text-green-600' : 'text-red-500'}`}
        >
          {todo.complete ? 'Completado' : 'Sin completar'}
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
