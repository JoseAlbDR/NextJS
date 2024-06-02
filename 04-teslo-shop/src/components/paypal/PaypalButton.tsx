'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  CreateOrderData,
  CreateOrderActions,
  OnApproveData,
  OnApproveActions,
} from '@paypal/paypal-js';
import React from 'react';
import {
  checkPaypalPayment,
  saveTransactionId,
  updateOrderStatus,
} from '@/lib/actions';
import { useRouter } from 'next/navigation';

interface Props {
  orderId: string;
  amount: number;
}

const PaypalButton = ({ orderId, amount }: Props) => {
  const [{ isPending }] = usePayPalScriptReducer();

  const roundedAmount = (Math.round(amount * 100) / 100).toFixed(2);

  const createOrder = async (
    data: CreateOrderData,
    actions: CreateOrderActions
  ): Promise<string> => {
    const transactionId = await actions.order.create({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          amount: {
            value: String(roundedAmount),
            currency_code: 'EUR',
          },
        },
      ],
    });

    const res = await saveTransactionId(orderId, transactionId);

    if (!res.ok) throw new Error(res.message);

    return transactionId;
  };

  const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
    const details = await actions.order?.capture();
    if (!details) return;
    const { order, ok, message } = await checkPaypalPayment(details.id!);

    if (!ok) throw new Error(message);
    const res = await updateOrderStatus(
      order?.purchase_units[0].invoice_id!,
      order?.status! === 'COMPLETED'
    );
    if (!res.ok) throw new Error('Error guardado estado de pedido');
  };

  return isPending ? (
    <div className="animate-pulse flex flex-col gap-3 mb-12">
      <div className="h-12 bg-gray-300 rounded"></div>
      <div className="h-12 bg-gray-300 rounded"></div>
    </div>
  ) : (
    <PayPalButtons createOrder={createOrder} onApprove={onApprove} />
  );
};

export default PaypalButton;
