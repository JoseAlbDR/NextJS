'use client';
import { SizeSelector, QuantitySelector } from '@/components';
import { FormProduct, Product, Size } from '@/interfaces';
import { useCartStore } from '@/store';
import React, { useState } from 'react';

interface Props {
  product: FormProduct;
}

const AddToCart = ({ product }: Props) => {
  const [size, setSize] = useState<Size | undefined>();
  const [quantity, setQuantity] = useState<number>(1);
  const [sizeError, setSizeError] = useState<string>('');

  const addProductToCart = useCartStore((state) => state.addProductToCart);

  const addToCart = () => {
    if (!size) return setSizeError('Por favor selecciona una talla');

    addProductToCart({
      id: product.id,
      image: product.images[0].url,
      price: product.price,
      quantity: quantity,
      size: size,
      slug: product.slug,
      title: product.title,
    });

    setSizeError('');
    setQuantity(1);
    setSize(undefined);
  };
  return (
    <>
      {/* Tallas */}
      <SizeSelector
        avaliableSizes={product.sizes}
        selectedSize={size}
        onSizeChanged={setSize}
      />
      {sizeError && <p className="text-red-500 mb-4 -mt-4">{sizeError}</p>}
      {/* Cantidad */}
      <h3 className="font-semibold mb-4">Cantidad</h3>
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
        stock={product.inStock}
      />
      {/* Button */}
      <button className="btn-primary my-5" onClick={addToCart}>
        Agregar al carrito
      </button>
    </>
  );
};

export default AddToCart;
