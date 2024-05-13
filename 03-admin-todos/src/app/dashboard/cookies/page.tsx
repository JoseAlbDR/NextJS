import { TabBar } from '@/cookies';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Cookies page',
  description: 'Cookies page',
};

const CookiesPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col">
        <span className="text-4xl">Tabs</span>
        <TabBar />
      </div>
    </div>
  );
};

export default CookiesPage;
