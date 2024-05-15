import Link from 'next/link';
import React from 'react';

const CategoryNotFound = () => {
  return (
    <div>
      <h1>404 Not Found</h1>
      <Link href={'/'}>Volver</Link>
    </div>
  );
};

export default CategoryNotFound;
