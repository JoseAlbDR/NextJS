import Image from 'next/image';
import React from 'react';
import PaidLabel from './PaidLabel';
import { getOrderStatus } from '@/lib/actions';

interface ProductImage {
  url: string;
}

interface Product {
  title: string;
  price: number;
  slug: string;
  images: ProductImage[];
}

interface OrderItem {
  quantity: number;
  size: string;
  product: Product;
}

interface Order {
  id: string;
  isPaid: boolean;
  orderItem: OrderItem[];
}

interface Props {
  order: Order;
}

const OrderCart = async ({ order }: Props) => {
  const { status: isPaid } = await getOrderStatus(order.id);

  return (
    <>
      <PaidLabel isPaid={isPaid || false} />
      {order?.orderItem.map(({ quantity, size, product }) => (
        <div key={`${product.slug} + ${size}`} className="flex mb-5">
          <Image
            src={`/products/${product.images[0].url}`}
            width={100}
            height={100}
            style={{ width: 100, height: 100 }}
            alt={product.title}
            className="mr-5 rounded"
          />
          <div>
            <p>{product.title}</p>
            <p>
              ${product.price} x {quantity}
            </p>
            <p className="font-semibold">
              Subtotal: ${product.price * quantity}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

export default OrderCart;
