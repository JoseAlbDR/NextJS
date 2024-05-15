import { tittleFont } from '@/config/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <h1>Hola mundo</h1>
      <h1 className={tittleFont.className}>Hola Mundo</h1>
    </main>
  );
}
