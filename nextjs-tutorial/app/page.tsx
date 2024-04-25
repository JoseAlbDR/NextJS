import Link from 'next/link';
import React from 'react';

const HomePage = () => {
  return (
    <>
      <h1 className="text-5xl mb-8 font-bold">NextJS Tutorial</h1>
      <Link href="/client" className="btn btn-outline capitalize">
        get started
      </Link>
    </>
  );
};

export default HomePage;
