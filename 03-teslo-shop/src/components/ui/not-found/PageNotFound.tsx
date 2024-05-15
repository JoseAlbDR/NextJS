import { tittleFont } from '@/config/fonts';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const PageNotFound = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row h-[800px] w-full justify-center items-center align-middle">
      <div className="text-center px-5 mx-5">
        <h2 className={`${tittleFont.className} antialiased text-9xl`}>404</h2>
        <p className="font-semibold text-xl">Whoops! Lo sentimos mucho</p>
        <span>Puedes regresar al </span>
        <Link
          href={'/'}
          className="capitalize font-normal hover:underline transition-all"
        >
          inicio
        </Link>
      </div>
      <div className="px-5 mx-5">
        <Image
          src="/imgs/starman_750x750.png"
          alt="404"
          width={500}
          height={500}
          className="p-5 sm:p-0"
        />
      </div>
    </div>
  );
};

export default PageNotFound;
