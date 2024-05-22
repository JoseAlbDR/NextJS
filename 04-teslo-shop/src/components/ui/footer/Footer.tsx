import { tittleFont } from '@/config/fonts';
import Link from 'next/link';
import React from 'react';

const Footer = () => {
  return (
    <div className="flex w-full justify-center text-xs mb-10">
      <Link href="/">
        <span className={`${tittleFont.className} antialiased font-bold`}>
          Teslo
        </span>
        <span> | Shop</span>
        <span>&copy;{new Date().getFullYear()}</span>
      </Link>

      <Link href="/" className="mx-3">
        Privacidad
      </Link>
      <Link href="/" className="mx-3">
        Mapa
      </Link>
    </div>
  );
};

export default Footer;
