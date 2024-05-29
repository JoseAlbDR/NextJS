import { tittleFont } from '@/config/fonts';
import Link from 'next/link';
import React from 'react';
import RegisterForm from './ui/RegisterForm';

const NewAccount = async () => {
  return (
    <div className="flex flex-col min-h-screen pt-32 sm:pt-52">
      <h1 className={`${tittleFont.className} text-4xl mb-5`}>Ingresar</h1>
      <RegisterForm />
    </div>
  );
};

export default NewAccount;
