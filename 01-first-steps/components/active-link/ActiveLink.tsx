'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface Props {
  path: string;
  text: string;
}

export const ActiveLink = ({ path, text }: Props) => {
  const pathname = usePathname();

  return (
    <Link
      className={`${pathname === path ? 'underline text-blue-900' : ''}`}
      href={path}
    >
      {text}
    </Link>
  );
};
