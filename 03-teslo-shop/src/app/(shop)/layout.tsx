import { Sidebar, TopMenu } from '@/components';
import React, { PropsWithChildren } from 'react';

const ShopLayout = ({ children }: PropsWithChildren) => {
  return (
    <main className="min-h-screen">
      <TopMenu />
      <Sidebar />
      <div className="px-0 sm:px-10">{children}</div>
    </main>
  );
};

export default ShopLayout;
