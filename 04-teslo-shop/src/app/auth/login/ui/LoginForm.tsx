'use client';

import { authenticate } from '@/lib/actions';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { BsExclamationCircle } from 'react-icons/bs';

const LoginButton = () => {
  const { pending } = useFormStatus();

  return (
    <button
      className={clsx({
        'btn-primary': !pending,
        'btn-disabled': pending,
      })}
      aria-disabled={pending}
      disabled={pending}
      type="submit"
    >
      Ingresar
    </button>
  );
};

const LoginForm = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [state, dispatch] = useFormState(
    (state: string | undefined, formData: FormData) =>
      authenticate(state, formData, callbackUrl),
    undefined
  );

  useEffect(() => {
    if (state === 'Success') window.location.replace(callbackUrl);
  }, [state, callbackUrl]);

  return (
    <form className="flex flex-col" action={dispatch}>
      <label htmlFor="email">Correo electrónico</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="email"
        name="email"
      />

      <label htmlFor="password">Contraseña</label>
      <input
        className="px-5 py-2 border bg-gray-200 rounded mb-5"
        type="password"
        name="password"
      />

      <LoginButton />

      <div
        className="flex h-8 items-end space-x-1"
        aria-live="polite"
        aria-atomic="true"
      >
        {state && (
          <>
            <BsExclamationCircle className="h-5 w-5 text-red-500" />
            <p className="text-sm text-red-500">{state}</p>
          </>
        )}
      </div>

      {/* divisor l ine */}
      <div className="flex items-center my-5">
        <div className="flex-1 border-t border-gray-500"></div>
        <div className="px-2 text-gray-800">O</div>
        <div className="flex-1 border-t border-gray-500"></div>
      </div>

      <Link href="/auth/new-account" className="btn-secondary text-center">
        Crear una nueva cuenta
      </Link>
    </form>
  );
};

export default LoginForm;
