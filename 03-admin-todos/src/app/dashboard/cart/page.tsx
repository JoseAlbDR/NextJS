import { Product, products } from '@/cart';
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

  return (
    <div>
      <h1 className="text-5xl">Productos en el carrito</h1>
      <hr className="mb-2" />
      <div className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
          {productsInCart.map((item) => (
            <ItemCard
              key={item.product.id}
              product={item.product}
              quantity={item.quantity}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CartPage;
