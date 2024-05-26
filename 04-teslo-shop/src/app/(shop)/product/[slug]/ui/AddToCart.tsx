'use client';
import { SizeSelector, QuantitySelector } from '@/components';
import { Size } from '@/interfaces';
import { Product } from '@prisma/client';
import React, { useState } from 'react';

interface Props {
  product: Product;
}

const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);

  return (
    <>
      {/* Tallas */}
      <SizeSelector
        avaliableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {/* Cantidad */}
      <h3 className="font-semibold mb-4">Cantidad</h3>
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        stock={product.inStock}
      />
      {/* Button */}
      <button className="btn-primary my-5">Agregar al carrito</button>
    </>
  );
};

export default AddToCart;
