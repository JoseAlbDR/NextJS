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
  return <div>{error.message}</div>;
};

export default error;
