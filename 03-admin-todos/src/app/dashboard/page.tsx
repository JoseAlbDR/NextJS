import { WidgetItem } from '@/components';
import React from 'react';
import SignIn from './components/SignIn';
import { auth } from '../../auth';
import { redirect } from 'next/navigation';

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      <WidgetItem title="Usuario conectado S-Side">
        <div className="flex flex-col">
          <span>{session?.user?.name}</span>
          <span>{session?.user?.email}</span>
          <span>{session?.user?.image}</span>
        </div>
      </WidgetItem>
    </div>
  );
};

export default DashboardPage;
