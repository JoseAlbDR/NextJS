import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <h1 className="text-7xl">HomePage</h1>
      <Link href="/about">About</Link>
    </>
  );
};

export default HomePage;
