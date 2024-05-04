import { WidgetsGrid } from '@/components';
import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Admin Dashboard',
  description: 'Admin Dashboard',
};

const MainPage = () => {
  return (
    <div className="text-black">
      <h1 className="text-3xl mt-2">Dashboard</h1>
      <span className="text-xl">Información general</span>
      <div className="flex flex-wrap p-2 gap-2 items-center justify-center">
        <WidgetsGrid />
      </div>
    </div>
  );
};

export default MainPage;
