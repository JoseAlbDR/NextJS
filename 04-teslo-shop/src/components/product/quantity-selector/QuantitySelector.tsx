'use client';
import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  selectedQuantity: number;
}

const QuantitySelector = ({ selectedQuantity }: Props) => {
  const [quantity, setQuantity] = useState<number>(selectedQuantity);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setQuantity(Number(event.target.value));
  };

  const handleIncrement = () => {
    if (quantity < 10) {
      setQuantity(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div>
      <div className="flex gap-2">
        <button onClick={handleDecrement}>
          <IoRemoveCircleOutline size={30} />
        </button>
        <select
          className=" bg-gray-200 rounded-md p-2"
          onChange={handleSelectChange}
          value={quantity}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((i) => (
            <option key={i} value={i}>
              {i}
            </option>
          ))}
        </select>
        <button onClick={handleIncrement}>
          <IoAddCircleOutline size={30} />
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
