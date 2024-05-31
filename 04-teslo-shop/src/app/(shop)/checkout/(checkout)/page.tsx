import { Title } from '@/components';
import Link from 'next/link';
import React from 'react';
import ProductList from './ui/ProductList';
import Checkout from './ui/Checkout';
import DeliveryAddress from './ui/DeliveryAddress';
import { getUserAddress } from '@/lib/actions';
import { auth } from '@/auth.config';

const CheckoutPage = async () => {
  const session = await auth();
  const DBAddress = await getUserAddress(session?.user.id!);

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
            <DeliveryAddress userAddress={DBAddress} />
            {/* Divider */}
            <div className="w-full h-[2px] bg-gray-200 mb-10"></div>
            <Checkout />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
