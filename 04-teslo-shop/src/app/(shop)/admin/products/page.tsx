export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { Pagination, Title } from '@/components';
import { getPaginatedOrders, getProducts, getUserOrders } from '@/lib/actions';
import { currencyFormat } from '@/utils';
import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  searchParams: {
    page: string;
  };
}

const OrdersPage = async ({ searchParams }: Props) => {
  const page = searchParams.page ? +searchParams.page : 1;

  const { products, totalPages, currentPage } = await getProducts({
    page,
  });

  return (
    <>
      <Title title="Mantenimiento de productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/products/new" className="btn-primary">
          Nuevo Producto
        </Link>
      </div>

      <div className="mb-10">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Imagen
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Titulo
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Precio
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Género
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Inventario
              </th>
              <th
                scope="col"
                className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
              >
                Tallas
              </th>
            </tr>
          </thead>
          <tbody>
            {products?.map((product) => (
              <tr
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100 w-full"
                key={product.id}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="w-20 h-20 object-cover rounded"
                  >
                    <Image
                      src={`/products/${product.images[0]}`}
                      alt={product.title}
                      width={80}
                      height={80}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/products/${product.slug}`}
                    className="hover:text-blue-500 underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 capitalize">
                  {product.gender}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.inStock}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 ">
                  {product.sizes.join(', ')}
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
