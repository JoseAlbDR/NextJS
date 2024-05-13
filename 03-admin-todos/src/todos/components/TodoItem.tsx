'use client';
import { Todo } from '@prisma/client';
import React, { startTransition, useOptimistic } from 'react';

import { IoCheckboxOutline, IoSquareOutline } from 'react-icons/io5';

interface Props {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | null>;
}

const TodoItem = ({ todo, toggleTodo }: Props) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo,
    (state, newCompleteValue: boolean) => ({
      ...state,
      complete: newCompleteValue,
    })
  );

  const onToggleTodo = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
      await toggleTodo(todoOptimistic.id, todoOptimistic.complete);
    } catch (error) {
      console.log(error);
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.complete));
    }
  };

  return (
    <div
      key={todoOptimistic.id}
      className={`card ${todoOptimistic.complete ? 'todoDone' : 'todoPending'}`}
    >
      <div
        // onClick={() => toggleTodo(todoOptimistic.id, todoOptimistic.complete)}
        onClick={onToggleTodo}
        className={`card-body sm:flex-row hover:bg-opacity-60 cursor-pointer w-full ${
          todoOptimistic.complete ? 'bg-blue-100' : 'bg-red-100'
        }`}
      >
        {todoOptimistic.complete ? (
          <IoCheckboxOutline size={30} />
        ) : (
          <IoSquareOutline size={30} />
        )}
        <p className="text-lg">{todoOptimistic.description}</p>
        <p className="text-md">
          {new Date(todoOptimistic.createdAt).toLocaleDateString()}
        </p>
        <span
          className={`${
            todoOptimistic.complete ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {todoOptimistic.complete ? 'Completado' : 'Sin completar'}
        </span>
      </div>
    </div>
  );
};

export default TodoItem;
