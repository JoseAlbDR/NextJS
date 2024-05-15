import { Title } from '@/components';
import { tittleFont } from '@/config/fonts';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="">
      <Title title="Tienda" subtitle="Todos los productos" />
    </main>
  );
}
