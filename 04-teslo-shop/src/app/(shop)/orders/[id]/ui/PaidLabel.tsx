'use client';

import { getOrderStatus } from '@/lib/actions';
import clsx from 'clsx';
import React from 'react';
import { IoCardOutline } from 'react-icons/io5';

interface Props {
  isPaid: boolean;
}

const PaidLabel = ({ isPaid }: Props) => {
  return (
    <div
      className={clsx(
        'flex items-center rounded-lg py-2 px-3.5 text-sx font-bold text-white mb-5',
        {
          'bg-red-500': !isPaid,
          'bg-green-700': isPaid,
        }
      )}
    >
      <IoCardOutline size={30} />
      {!isPaid ? (
        <span className="mx-2">Pendiente de pago</span>
      ) : (
        <span className="mx-2">Pagado</span>
      )}
    </div>
  );
};

export default PaidLabel;
