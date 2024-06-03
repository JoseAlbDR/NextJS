export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Pagination, Title } from '@/components';
import {
  getPaginatedOrders,
  getPaginatedUsers,
  getUserOrders,
} from '@/lib/actions';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';
import UsersTable from './ui/UsersTable';

interface Props {
  searchParams: {
    page: string;
  };
}

const AdminUsersPage = async ({ searchParams }: Props) => {
  const page = +searchParams.page;

  const { users, currentPage, totalPages } = await getPaginatedUsers({
    page,
  });

  return (
    <>
      <Title title="User Roles" />

      <div className="mb-10">
        <UsersTable users={users} />
        <div className="mt-10">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default AdminUsersPage;
