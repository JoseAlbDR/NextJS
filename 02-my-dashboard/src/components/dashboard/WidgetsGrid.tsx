'use client';
import React from 'react';
import SimpleWidget from './SimpleWidget';
import { useAppSelector } from '@/store';
import { IoCartOutline } from 'react-icons/io5';

const WidgetsGrid = () => {
  const count = useAppSelector((state) => state.counter.count);

  return (
    <div className="flex flex-wrap p-2 gap-2 items-center justify-center">
      <SimpleWidget
        icon={<IoCartOutline size={40} />}
        title={String(count)}
        label="Contador"
        href="/dashboard/counter"
        subtitle="items añadidos"
      />
    </div>
  );
};

export default WidgetsGrid;
