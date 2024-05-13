'use server';
import { Todo } from '../components/TodosGrid';

export const toggleCompleted = async (
  id: string,
  complete: boolean
): Promise<Todo | null> => {
  try {
    const todo: Todo = await fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        complete: !complete,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const createTodo = async (description: string): Promise<Todo | null> => {
  try {
    const todo: Todo = await fetch(`http://localhost:3000/api/todos/`, {
      method: 'POST',
      body: JSON.stringify({
        description,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json());

    return todo;
  } catch (error) {
    console.log(error);
    return null;
  }
};
