'use client';

import React from 'react';

const error = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  console.log(error);
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button
        className="btn btn-outline btn-primary"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
};

export default error;
