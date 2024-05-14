'use client';
import { useSession, signOut, signIn } from 'next-auth/react';
import React from 'react';
import { BiLoader } from 'react-icons/bi';
import { CiLogin, CiLogout } from 'react-icons/ci';

const LogoutButton = () => {
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  if (status === 'unauthenticated')
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
      >
        {isLoading ? <BiLoader /> : <CiLogin />}
        <span className="group-hover:text-gray-700">
          {isLoading ? 'Espere...' : 'Login'}
        </span>
      </button>
    );

  return (
    <button
      onClick={() => signOut()}
      className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group"
    >
      {isLoading ? <BiLoader /> : <CiLogout />}
      <span className="group-hover:text-gray-700">
        {isLoading ? 'Espere...' : 'Logout'}
      </span>
    </button>
  );
};

export default LogoutButton;
