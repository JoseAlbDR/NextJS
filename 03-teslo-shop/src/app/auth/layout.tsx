import React, { PropsWithChildren } from 'react';

const AuthLayout = ({ children }: PropsWithChildren) => {
  return <main className="bg-green-500 min-h-screen">{children}</main>;
};

export default AuthLayout;
