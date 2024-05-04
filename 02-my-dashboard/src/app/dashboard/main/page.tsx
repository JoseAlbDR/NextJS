import { SimpleWidget } from '@/components';
import React from 'react';

const MainPage = () => {
  return (
    <div className="text-black">
      <h1 className="text-3xl mt-2">Dashboard</h1>
      <span className="text-xl">Información general</span>
      <div className="flex flex-wrap p-2">
        <SimpleWidget />
      </div>
    </div>
  );
};

export default MainPage;
