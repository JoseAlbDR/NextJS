import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  addProductToCart: (product: CartProduct) => void;
  // updateProductQuantity
  //
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],
      getTotalItems: () => {
        const { cart } = get();
        const totalItems = cart.reduce(
          (acc, product) => acc + product.quantity,
          0
        );
        return totalItems;
      },

      addProductToCart: (product) => {
        const { cart } = get();

        const productInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productInCart) return set({ cart: [...cart, product] });

        const updatedCartProduct = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity: item.quantity + product.quantity };

          return item;
        });

        set({ cart: updatedCartProduct });
      },
    }),
    {
      name: 'shopping-cart',
      // skipHydration: true
    }
  )
);