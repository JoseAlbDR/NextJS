'use client';
import React, { useState } from 'react';

const ClientPage = () => {
  const [counter, setCounter] = useState(0);

  return (
    <>
      <h1 className="text-5xl font-semibold mb-8">Counter</h1>
      <div className="flex items-center justify-start gap-4">
        <button
          className="btn btn-circle btn-primary"
          onClick={() => setCounter((counter) => (counter -= 1))}
        >
          -
        </button>
        <div className="text-5xl ">{counter}</div>
        <button
          className="btn btn-circle btn-primary"
          onClick={() => setCounter((counter) => (counter += 1))}
        >
          +
        </button>
      </div>
    </>
  );
};

export default ClientPage;
