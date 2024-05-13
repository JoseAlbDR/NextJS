import React from 'react';
import TodoItem from './TodoItem';
// import * as api from '@/todos/helpers/todos';
// import { useRouter } from 'next/navigation';
import { toggleTodo } from '../actions/todo-actions';
import { Todo } from '@prisma/client';

interface Props {
  todos?: Todo[];
}
const TodosGrid = ({ todos = [] }: Props) => {
  // const router = useRouter();

  // const toggleTodo = async (
  //   id: string,
  //   complete: boolean
  // ): Promise<Todo | null> => {
  //   const updatedTodo = await api.toggleCompleted(id, complete);
  //   //! To Refresh Data
  //   router.refresh();
  //   return updatedTodo;
  // };

  return (
    <div className="grid  md:grid-cols-2  gap-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div>
  );
};

export default TodosGrid;
