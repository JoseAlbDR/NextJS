import Link from 'next/link';
import React from 'react';

const links = [
  { href: '/client', label: 'clients' },
  { href: '/drinks', label: 'drinks' },
  { href: '/tasks', label: 'tasks' },
  { href: '/query', label: 'react-query' },
];

const Navbar = () => {
  return (
    <div className="navbar ">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="btn btn-ghost text-xl"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default Navbar;
