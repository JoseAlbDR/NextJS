import { Title } from '@/components';
import Link from 'next/link';
import React from 'react';
import ProductList from './ui/ProductList';

const CheckoutPage = () => {
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
            <ProductList />
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
            <div className="mt-5 mb-2 w-full">
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
