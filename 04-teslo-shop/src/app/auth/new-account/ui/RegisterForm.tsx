'use client';
import { login, registerUser } from '@/lib/actions';
import clsx from 'clsx';
import Link from 'next/link';
import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

type FormInputs = {
  name: string;
  email: string;
  password: string;
};

const ShowError = ({ error }: { error: string }) => {
  return (
    <div
      className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
      role="alert"
    >
      <strong className="font-bold">Error! </strong>
      <span className="block sm:inline">{error}</span>
    </div>
  );
};

const RegisterForm = () => {
  const [error, setError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>();

  const onFormSubmit: SubmitHandler<FormInputs> = async (data) => {
    const { email, name, password } = data;

    const response = await registerUser(name, email, password);

    if (!response.ok) return setError(response.message);

    setError('');

    await login(email.toLowerCase(), password);
    window.location.replace('/');
  };

  return (
    <>
      <form className="flex flex-col" onSubmit={handleSubmit(onFormSubmit)}>
        <label htmlFor="name">Nombre Completo</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-500': !!errors.name,
          })}
          type="text"
          autoFocus
          {...register('name', { required: true })}
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-400': !!errors.email,
          })}
          type="email"
          {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className={clsx('px-5 py-2 border bg-gray-200 rounded mb-5', {
            'border-red-400': !!errors.password,
          })}
          type="password"
          {...register('password', { required: true })}
        />

        {error && (
          <span className="bg-red-200 text-red-500 py-2 px-4 mb-2 rounded">
            {error}
          </span>
        )}

        <button className="btn-primary" type="submit">
          Nueva Cuenta
        </button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </form>
    </>
  );
};

export default RegisterForm;
