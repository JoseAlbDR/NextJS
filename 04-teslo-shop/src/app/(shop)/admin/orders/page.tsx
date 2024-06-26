export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Pagination, Title } from '@/components';
import { getPaginatedOrders, getUserOrders } from '@/lib/actions';
import clsx from 'clsx';
import Link from 'next/link';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page: string;
  };
}

const OrdersPage = async ({ searchParams }: Props) => {
  const page = +searchParams.page;

  const { orders, currentPage, totalPages } = await getPaginatedOrders({
    page,
  });

  return (
    <>
      <Title title="Orders" />

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                #ID
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Nombre completo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Estado
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Opciones
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order) => (
              <tr
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                key={order.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split('-').at(-1)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.OrderAddress?.name}
                </td>
                <td className="flex items-center text-sm  text-gray-900 font-light px-6 py-4 whitespace-nowrap gap-1">
                  <IoCardOutline
                    className={clsx({
                      'text-green-800': order.isPaid,
                      'text-red-800': !order.isPaid,
                    })}
                  />
                  <span
                    className={clsx({
                      'text-green-800': order.isPaid,
                      'text-red-800': !order.isPaid,
                    })}
                  >
                    {order.isPaid ? 'Pagada' : 'No pagada'}
                  </span>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  <Link
                    href={`/orders/${order.id}`}
                    className="hover:underline"
                  >
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10">
          <Pagination currentPage={currentPage} totalPages={totalPages} />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
