'use client';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { SessionProvider } from 'next-auth/react';
import React, { PropsWithChildren } from 'react';

const Provider = ({ children }: PropsWithChildren) => {
  return (
    <SessionProvider>
      <PayPalScriptProvider
        options={{
          clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID ?? '',
          intent: 'capture',
          currency: 'EUR',
        }}
      >
        {children}
      </PayPalScriptProvider>
    </SessionProvider>
  );
};

export default Provider;
