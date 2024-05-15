'use client';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import React from 'react';

const ProfilePage = () => {
  const { data: session } = useSession();

  if (!session) redirect('/api/auth/signin');

  return (
    <div>
      <h1>Page Profile</h1>
      <hr />
      <div className="flex flex-col gap-2 mt-4">
        <span>{session?.user?.name}</span>
        <span>{session?.user?.email}</span>
        <span>{session?.user?.image}</span>
        <span>{session?.user?.roles?.join(', ')}</span>
      </div>
    </div>
  );
};

export default ProfilePage;
