import { TopMenu } from '@/components';
import React, { PropsWithChildren } from 'react';

const ShopLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen">
      <TopMenu />
      {children}
    </main>
  );
};

export default ShopLayout;
