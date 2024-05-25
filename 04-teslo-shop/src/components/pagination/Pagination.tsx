'use client';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import React, { useEffect } from 'react';
import { BiChevronLeft, BiChevronRight } from 'react-icons/bi';

interface Props {
  totalPages: number;
  currentPage: number;
}

const Pagination = ({ totalPages, currentPage }: Props) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (currentPage === 1 || currentPage < 1 || currentPage > totalPages) {
      router.push(`${pathname}?page=1`);
    }
  }, [currentPage, pathname, router, totalPages]);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="w-full flex items-center justify-center mb-10 gap-2">
      <button onClick={() => handlePageChange(currentPage - 1)}>
        <BiChevronLeft size={30} />
      </button>
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          className={clsx('px-4 py-2 rounded-md', {
            'bg-blue-500 text-white': currentPage === page,
          })}
          onClick={() => handlePageChange(page)}
        >
          {page}
        </button>
      ))}
      <button onClick={() => handlePageChange(currentPage + 1)}>
        <BiChevronRight size={30} />
      </button>
    </div>
  );
};

export default Pagination;
