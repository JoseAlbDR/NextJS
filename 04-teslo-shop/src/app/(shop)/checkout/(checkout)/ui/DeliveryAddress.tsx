'use client';
import { useAddressStore } from '@/store/address/address-store';
import { Address } from '@prisma/client';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';

interface Props {
  userAddress: Address | null;
}

const DeliveryAddress = ({ userAddress }: Props) => {
  const [loaded, setLoaded] = useState(false);
  const address = useAddressStore((state) => state.address);

  useEffect(() => {
    setLoaded(true);
  }, [loaded]);

  return (
    <>
      {!loaded ? (
        <div className="min-h-[240px] grid place-items-center">
          <FaSpinner size={50} className="animate-spin" />
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-2">Dirección de entrega</h2>
          <div className="mb-10 flex flex-col gap-2">
            <p className="text-xl">{address.name}</p>
            <p>
              {address.address}
              {` - ${address.address2 ? address.address2 : ''}`}
            </p>
            <p>
              {address.city} - {address.zip}
            </p>
            <p>Tel: {address.phone}</p>
          </div>
        </>
      )}
    </>
  );
};

export default DeliveryAddress;
