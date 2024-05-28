import { auth } from '@/auth.config';
import { redirect } from 'next/navigation';
import React, { PropsWithChildren } from 'react';

const AuthLayout = async ({ children }: PropsWithChildren) => {
  // const session = await auth();

  // if (session?.user) redirect('/');

  return (
    <main className="flex justify-center">
      <div className="w-full sm:w-[350px] px-10">{children}</div>
    </main>
  );
};

export default AuthLayout;
