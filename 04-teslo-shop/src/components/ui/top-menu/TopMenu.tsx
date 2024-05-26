'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { tittleFont } from '@/config/fonts';
import { IoCartOutline, IoMenuOutline, IoSearchOutline } from 'react-icons/io5';
import { useUIStore } from '@/store';
import { useCartStore } from '@/store/cart/cart-store';
import clsx from 'clsx';

const navLinks = [
  {
    href: '/gender/men',
    label: 'Hombres',
  },
  {
    href: '/gender/women',
    label: 'Mujeres',
  },
  {
    href: '/gender/kid',
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
  const openSideMenu = useUIStore((state) => state.openSideMenu);
  const cartQuantity = useCartStore((state) => state.getTotalItems());

  //! TO SOLVE HIDRATION PROBLEM FROM LOCAL STORAGE CART
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

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
        <Link
          href={`${cartQuantity > 0 && loaded ? '/cart' : '/empty'}`}
          className="mx-2"
        >
          <div className={clsx('relative', { 'animate-spin': !loaded })}>
            {loaded && cartQuantity >= 0 && (
              <span className="fade-in absolute text-xs px-1 rounded-full font-bold -top-2 -right-2 bg-blue-700 text-white ">
                {cartQuantity}
              </span>
            )}
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
