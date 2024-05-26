import { Size } from '@/interfaces';
import clsx from 'clsx';
import React from 'react';

interface Props {
  selectedSize: Size | undefined;
  avaliableSizes: Size[];
  onSizeChanged: (size: Size) => void;
}

const SizeSelector = ({
  selectedSize,
  avaliableSizes,
  onSizeChanged,
}: Props) => {
  return (
    <div className="my-5">
      <h3 className="font-semibold mb-4">Tallas Disponibles</h3>
      <div className="flex">
        {avaliableSizes.map((size) => (
          <button
            key={size}
            className={clsx('mx-2 hover:underline text-lg', {
              underline: size === selectedSize,
            })}
            onClick={() => onSizeChanged(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelector;
