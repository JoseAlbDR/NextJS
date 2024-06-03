import { PaypalButton, Title } from '@/components';
import { getOrder } from '@/lib/actions';
import { currencyFormat } from '@/utils';
import React from 'react';
import OrderCart from './ui/OrderCart';
import PaidLabel from './ui/PaidLabel';

interface Props {
  params: {
    id: string;
  };
}

const OrderPage = async ({ params }: Props) => {
  const { order, ok, message } = await getOrder(params.id);

  if (!ok) return <div className="text-center h-full">{message}</div>;

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        <Title title={`Orden número: #${order!.id.split('-').at(-1)}`} />
        <div className="grid grid-col-1 sm:grid-cols-2 gap-10">
          {/* Carrito */}
          <div className="flex flex-col my-6">
            <OrderCart order={order!} />
          </div>

          {/* Checkout */}
          <div className="bg-white rounded-xl shadow-xl p-7 flex flex-col h-fit">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                Dirección de entrega
              </h2>
              <div className="mb-10 flex flex-col gap-2">
                <p className="text-xl">{order?.OrderAddress?.name}</p>
                <p>{`${order?.OrderAddress?.address} - ${order?.OrderAddress?.address2}`}</p>
                <p>{`${order?.OrderAddress?.city} - ${order?.OrderAddress?.zip}`}</p>
                <p>Tel: {order?.OrderAddress?.phone}</p>
              </div>
            </div>

            {/* Divider */}
            <div className="w-full h-[2px] bg-gray-200 mb-10"></div>
            <div>
              <h2 className="text-2xl font-semibold mb-2">Resumen de compra</h2>
              <div className="grid grid-cols-2">
                <span>No. Productos</span>
                <span className="text-right">{order?.itemsInOrder}</span>
                <span>Subtotal</span>
                <span className="text-right">
                  {currencyFormat(order?.subTotal!)}
                </span>
                <span>IVA (21%)</span>
                <span className="text-right ">
                  {currencyFormat(order?.tax!)}
                </span>
                <span className="mt-5 text-2xl">Total</span>
                <span className="text-right mt-5 text-2xl">
                  {currencyFormat(order?.total!)}
                </span>
              </div>
              <div className="mt-5 mb-2 w-full">
                {order!.isPaid ? (
                  <PaidLabel isPaid={order!.isPaid || false} />
                ) : (
                  <PaypalButton amount={order?.total!} orderId={order?.id!} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPage;
