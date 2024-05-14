import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { Product } from '../../cart/data/products';

export const getCookieCart = (): { [id: string]: number } => {
  if (hasCookie('cart')) {
    const cookieCart = JSON.parse((getCookie('cart') as string) ?? '{}');
    return cookieCart;
  }

  return {};
};

export const removeSingleItemFromCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] === 1 ? delete cookieCart[id] : (cookieCart[id] -= 1);
  }
  setCookie('cart', JSON.stringify(cookieCart));
};

export const addProductToCart = (id: string) => {
  const cookieCart = getCookieCart();
  if (cookieCart[id]) {
    cookieCart[id] += 1;
  } else {
    cookieCart[id] = 1;
  }

  setCookie('cart', JSON.stringify(cookieCart));
};

export const removeProductFromCart = (id: string) => {
  const cookieCart = getCookieCart();

  let updatedCart: { [key: string]: number } = {};
  if (cookieCart[id]) {
    Object.keys(cookieCart).forEach((key) => {
      if (key === id) return;
      updatedCart = { ...updatedCart, [key]: cookieCart[key] };
    });

    setCookie('cart', JSON.stringify(updatedCart));
  }
};
