import React from 'react';
import TodoItem from './TodoItem';

export interface Todo {
  id: string;
  description: string;
  complete: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Props {
  todos?: Todo[];
}
const TodosGrid = ({ todos = [] }: Props) => {
  return (
    <div className="grid  md:grid-cols-2  gap-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default TodosGrid;
