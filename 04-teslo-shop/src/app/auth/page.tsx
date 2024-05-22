import { redirect } from 'next/navigation';
import React from 'react';

const AuthPage = () => {
  redirect('/auth/login');

  return <div>AuthPage</div>;
};

export default AuthPage;
