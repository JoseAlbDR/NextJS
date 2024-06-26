import { WidgetItem } from '@/components';
import React from 'react';
import SignIn from './components/SignIn';
import { auth } from '../auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();

  console.log({ session });

  return (
    <div className="grid gap-6 ">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{session?.user?.name}</span>
          <span>{session?.user?.email}</span>
          <span>{session?.user?.image}</span>
          <div>{JSON.stringify(session)}</div>
        </div>
      </WidgetItem>
    </div>
  );
};

export default DashboardPage;
