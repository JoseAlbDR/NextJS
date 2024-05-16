'use client';
import React from 'react';
import Link from 'next/link';
import { tittleFont } from '@/config/fonts';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { useStore } from '@/store';

const navLinks = [
  {
    href: '/category/men',
    label: 'Hombres',
  },
  {
    href: '/category/women',
    label: 'Mujeres',
  },
  {
    href: '/category/kid',
    label: 'Niños',
  },
];

const endLinks = [
  {
    href: '/search',
    label: 'Buscar',
    icon: <IoSearchOutline className="w.5 h-5" />,
  },
  {
    href: '/cart',
    label: 'Carrito',
    icon: <IoCartOutline className="w.5 h-5" />,
  },
  {
    href: '#',
    label: 'Menu',
    icon: <IoMenuOutline className="w.5 h-5" />,
  },
];

const TopMenu = () => {
  const openSideMenu = useStore((state) => state.openSideMenu);
  return (
    <nav className="flex px-4 py-2 justify-between items-center w-full">
      {/* Logo */}
      <div>
        <Link href={'/'}>
          <span className={`${tittleFont.className} antialiased font-bold`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>

      {/* Center Menu */}
      <div className="hidden sm:block">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Search, cart, menu */}
      <div className="flex items-center">
        <Link
          href="/search"
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
        >
          <IoSearchOutline className="w.5 h-5" />
        </Link>
        <Link href="/cart" className="mx-2">
          <div className="relative">
            <span className="absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white ">
              3
            </span>
            <IoCartOutline className="w.5 h-5" />
          </div>
        </Link>
        <button
          className="m-2 p-2 rounded-md transition-all hover:bg-gray-100"
          onClick={() => openSideMenu()}
        >
          <IoMenuOutline className="w.5 h-5" />
        </button>
      </div>
    </nav>
  );
};

export default TopMenu;
