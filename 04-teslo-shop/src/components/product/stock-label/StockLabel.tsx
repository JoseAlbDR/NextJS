export const revalidate = 0;

import { tittleFont } from '@/config/fonts';
import { getStockBySlug } from '@/lib/actions';

import React from 'react';

interface Props {
  slug: string;
}

const StockLabel = async ({ slug }: Props) => {
  const inStock = await getStockBySlug({ slug });

  return (
    <h2 className={`${tittleFont.className} antialiased font-bold text-lg`}>
      Stock: {inStock}
    </h2>
  );
};

export default StockLabel;
