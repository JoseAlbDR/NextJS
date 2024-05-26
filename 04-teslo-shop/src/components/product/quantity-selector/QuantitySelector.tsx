'use client';
import React, { useState } from 'react';
import { IoAddCircleOutline, IoRemoveCircleOutline } from 'react-icons/io5';

interface Props {
  quantity: number;
  stock: number;
  onQuantityChanged: (quantity: number) => void;
}

const QuantitySelector = ({ quantity, onQuantityChanged, stock }: Props) => {
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onQuantityChanged(Number(event.target.value));
  };

  const handleIncrement = () => {
    if (quantity < stock) {
      onQuantityChanged(quantity + 1);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      onQuantityChanged(quantity - 1);
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
          {Array.from({ length: stock }, (_, i) => i + 1).map((i) => (
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
