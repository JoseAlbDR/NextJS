import { QuantitySelector, Title } from '@/components';
import { Product } from '@/interfaces';
import { initialData } from '@/seed/seed';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const CheckoutPage = () => {
  const products = [
    initialData.products[0],
    initialData.products[1],
    initialData.products[2],
  ];

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title="Verificar Compra" />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col my-6">
            <span className="text-xl">Ajustar Elementos</span>
            <Link href="/cart" className="underline mb-5">
              Editar carrito
            </Link>

            {products.map((product) => (
              <div key={product.slug} className="flex mb-5">
                <Image
                  src={`/products/${product.images[0]}`}
                  width={100}
                  height={100}
                  style={{ width: 100, height: 100 }}
                  alt={product.title}
                  className="mr-5 rounded"
                />
                <div>
                  <p>{product.title}</p>
                  <p>${product.price} x 3</p>
                  <p className="font-semibold">
                    Subtotal: ${product.price * 3}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 ">
            <h2 className="text-2xl font-semibold mb-2">
              Dirección de entrega
            </h2>
            <div className="mb-10 flex flex-col gap-2">
              <p className="text-xl">Jose Alberto</p>
              <p>Calle Infanta Beatriz 2, 1ºD</p>
              <p>Granada, 18004</p>
              <p>Tel: 666666666</p>
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-gray-200 mb-10"></div>
            <h2 className="text-2xl font-semibold mb-2">Resumen de compra</h2>
            <div className="grid grid-cols-2">
              <span>No. Productos</span>
              <span className="text-right">3 artículos</span>
              <span>Subtotal</span>
              <span className="text-right">$100</span>
              <span>IVA (21%)</span>
              <span className="text-right ">$21</span>
              <span className="mt-5 text-2xl">Total</span>
              <span className="text-right mt-5 text-2xl">$121</span>
            </div>
            <div>
              <p className="mb-5">
                <span className="text-xs">
                  Al hacer clic en &quot;Hacer Compra&quot;, aceptas nuestros{' '}
                  <Link href="/terms-and-conditions" className="underline">
                    Términos y Condiciones{' '}
                  </Link>
                  y
                  <Link href={'/privacy-policy'} className="underline">
                    {' '}
                    Políticas de Privacidad.
                  </Link>
                </span>
              </p>

              <Link
                href="/orders/123"
                className="flex justify-center btn-primary mt-5"
              >
                Hacer Compra
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
