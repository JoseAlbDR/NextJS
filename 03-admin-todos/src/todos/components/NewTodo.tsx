'use client';

import { FormEvent, useState } from 'react';
import { IoTrashOutline } from 'react-icons/io5';
import * as api from '@/todos/helpers/todos';
import { useRouter } from 'next/navigation';

const NewTodo = ({ deleteCompleted }: { deleteCompleted: () => void }) => {
  const [description, setDescription] = useState<string>('');
  const router = useRouter();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    if (!data) return;

    await api.createTodo(data.description as string);
    setDescription('');
    router.refresh();
  };

  return (
    <form className="flex w-full" onSubmit={handleSubmit}>
      <input
        type="text"
        className="w-6/12 -ml-10 pl-3 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-sky-500 transition-all"
        placeholder="¿Qué necesita ser hecho?"
        name="description"
        onChange={(e) => setDescription(e.target.value)}
        value={description}
      />

      <button
        type="submit"
        className="flex items-center justify-center rounded ml-2 bg-sky-500 p-2 text-white hover:bg-sky-700 transition-all"
      >
        Crear
      </button>

      <span className="flex flex-1"></span>

      <button
        onClick={() => {
          deleteCompleted();
          router.refresh();
        }}
        type="button"
        className="flex items-center justify-center rounded ml-2 bg-red-400 p-2 text-white hover:bg-red-700 transition-all"
      >
        <IoTrashOutline />
        Delete
      </button>
    </form>
  );
};

export default NewTodo;
