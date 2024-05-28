import { auth } from '@/auth.config';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import React from 'react';
import { json } from 'stream/consumers';

const ProfilePage = async () => {
  const session = await auth();

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session?.user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
