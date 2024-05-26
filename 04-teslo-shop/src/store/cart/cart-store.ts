import { CartProduct } from '@/interfaces';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SummaryInfo {
  totalProducts: number;
  subtotal: number;
  tax: number;
  total: number;
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getTotalPrice: () => number;
  getSummaryInformation: () => SummaryInfo;
  addProductToCart: (product: CartProduct) => void;
  changeProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProductFromCart: (product: CartProduct) => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getSummaryInformation: () => {
        return {
          totalProducts: get().getTotalItems(),
          subtotal: get().getTotalPrice(),
          tax: 0.21 * get().getTotalPrice(),
          total: get().getTotalPrice() * 1.21,
        };
      },
      removeProductFromCart: (product) => {
        const { cart } = get();
        const updatedCart = cart.filter((item) => {
          return !(item.id === product.id && item.size === product.size);
        });

        return set({ cart: updatedCart });
      },
      changeProductQuantity: (product, quantity) => {
        const { cart } = get();
        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size)
            return { ...item, quantity };
          return item;
        });
        set({ cart: updatedCart });
      },
      getTotalPrice: () => {
        const { cart } = get();

        return cart.reduce((acc, product) => {
          return acc + product.quantity * product.price;
        }, 0);
      },
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
