'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface Props {
  href: string;
  name: string;
  icon: React.ReactNode;
}

const SidebarItem = ({ href, name, icon }: Props) => {
  const path = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`relative px-4 py-3 flex items-center space-x-4 rounded-xl group hover:bg-gradient-to-r hover:from-sky-400 hover:to-cyan-200 hover:text-white transition-all ${
          path === href
            ? 'text-white bg-gradient-to-r from-sky-600 to-cyan-400'
            : ''
        }`}
      >
        {icon}
        <span className="-mr-1 font-medium">{name}</span>
      </Link>
    </li>
  );
};

export default SidebarItem;
