'use client';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import React from 'react';

const PaypalButton = () => {
  const [{ isPending }] = usePayPalScriptReducer();

  return isPending ? (
    <div className="animate-pulse flex flex-col gap-3">
      <div className="h-12 bg-gray-300 rounded"></div>
      <div className="h-12 bg-gray-300 rounded"></div>
    </div>
  ) : (
    <PayPalButtons />
  );
};

export default PaypalButton;
