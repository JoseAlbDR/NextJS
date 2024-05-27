import React, { PropsWithChildren } from 'react';

const AuthLayout = async ({ children }: PropsWithChildren) => {
  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
};

export default AuthLayout;
