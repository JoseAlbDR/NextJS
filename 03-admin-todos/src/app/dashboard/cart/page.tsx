import { Product, products } from '@/cart';
import { WidgetItem } from '@/components';
import { ItemCard } from '@/shopping-cart/components/ItemCard';
import { cookies } from 'next/headers';
import React from 'react';

export const metadata = {
  title: 'Carrito de compras',
  description: 'Carrito de compras',
};

interface ProductInCart {
  product: Product;
  quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }) => {
  const productsInCart: ProductInCart[] = [];

  Object.entries(cart).forEach(([id, quantity]) => {
    const product = products.find((product) => product.id === id);
    if (product) productsInCart.push({ product, quantity });
  });

  return productsInCart;
};

const CartPage = () => {
  const cookieStore = cookies();
  const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as {
    [id: string]: number;
  };

  const productsInCart = getProductsInCart(cart);

  const totalToPay = productsInCart.reduce((prev, current) => {
    return prev + current.product.price * current.quantity;
  }, 0);

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((item) => (
            <ItemCard
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
        <div className="flex flex-col w-full sm:w-4/12">
          <WidgetItem title="Total a pagar">
            <div className="mt-2 flex justify-center gap-4">
              <h3 className="text-3xl font-bold text-gray-700">
                ${totalToPay * 1.21}
              </h3>
            </div>
            <span className="font-bold text-center text-gray-500">
              Impuestos 21%: ${(totalToPay * 0.21).toFixed(2)}
            </span>
          </WidgetItem>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
