import { auth } from './auth';
import Image from 'next/image';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session) redirect('/dashboard/');
  if (!session) redirect('/api/auth/signin');

  return (
    <>
      <h1>Hola mundo</h1>
    </>
  );
}
