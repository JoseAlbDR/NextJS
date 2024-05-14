import { TabBar } from '@/cookies';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cookies page',
  description: 'Cookies page',
};

const tabOptions = [1, 2, 3, 4, 5];

const CookiesPage = () => {
  const cookieStore = cookies();
  const selectedTab = cookieStore.get('selectedTab');

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-4xl">Tabs</span>
        <TabBar
          tabOptions={tabOptions}
          currentIndex={Number(selectedTab?.value) || 1}
        />
      </div>
    </div>
  );
};

export default CookiesPage;
