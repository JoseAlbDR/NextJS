import { tittleFont } from '@/config/fonts';
import Link from 'next/link';
import React from 'react';

const NewAccount = () => {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${tittleFont.className} text-4xl mb-5`}>Ingresar</h1>

      <div className="flex flex-col">
        <label htmlFor="name">Nombre Completo</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="text"
        />

        <label htmlFor="email">Correo electrónico</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <label htmlFor="email">Contraseña</label>
        <input
          className="px-5 py-2 border bg-gray-200 rounded mb-5"
          type="email"
        />

        <button className="btn-primary">Nueva Cuenta</button>

        {/* divisor l ine */}
        <div className="flex items-center my-5">
          <div className="flex-1 border-t border-gray-500"></div>
          <div className="px-2 text-gray-800">O</div>
          <div className="flex-1 border-t border-gray-500"></div>
        </div>

        <Link href="/auth/login" className="btn-secondary text-center">
          Ingresar
        </Link>
      </div>
    </div>
  );
};

export default NewAccount;