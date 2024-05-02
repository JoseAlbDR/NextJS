import { HomeIcon } from '@primer/octicons-react';
import Link from 'next/link';
import React from 'react';
import { ActiveLink } from '@/components';

const navItems = [
  {
    path: '/about',
    text: 'About',
  },
  {
    path: '/contact',
    text: 'Contact',
  },
  {
    path: '/pricing',
    text: 'Pricing',
  },
];

export const Navbar = async () => {
  return (
    <nav className="flex bg-blue-800 bg-opacity-30 p-2 m-2 rounded justify-between text-white">
      <Link href="/" className="flex items-center gap-1">
        <HomeIcon />
        Home
      </Link>
      <div className="flex gap-3 ">
        {navItems.map((item) => (
          <ActiveLink key={item.path} {...item} />
        ))}
      </div>
    </nav>
  );
};
