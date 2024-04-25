import Link from 'next/link';
import React from 'react';

const AboutPage = () => {
  return (
    <>
      <h1 className="text-4xl">Info Page</h1>
      <div className="flex flex-col gap-3">
        <Link href="/">Home</Link>
        <Link href="/about/info">Info</Link>
      </div>
    </>
  );
};

export default AboutPage;
