import React, { PropsWithChildren } from 'react';

const ShopLayout = ({ children }: PropsWithChildren) => {
  return <main className="bg-red-500 min-h-screen">{children}</main>;
};

export default ShopLayout;
