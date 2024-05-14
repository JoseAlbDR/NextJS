import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { CiBookmarkCheck, CiLogout } from 'react-icons/ci';
import SidebarItem from './SidebarItem';
import { FcTodoList } from 'react-icons/fc';
import {
  IoCartOutline,
  IoCheckboxOutline,
  IoListOutline,
  IoStarOutline,
} from 'react-icons/io5';
import { auth } from '../../auth';

const sidebarItems = [
  {
    href: '/dashboard',
    name: 'Dashboard',
    icon: <CiBookmarkCheck size={30} />,
  },
  {
    href: '/dashboard/rest-todos',
    name: 'Rest Todos',
    icon: <IoListOutline size={30} />,
  },
  {
    href: '/dashboard/server-todos',
    name: 'Server Actions',
    icon: <IoCheckboxOutline size={30} />,
  },
  {
    href: '/dashboard/cookies',
    name: 'Cookies',
    icon: <IoStarOutline size={30} />,
  },
  {
    href: '/dashboard/products',
    name: 'Productos',
    icon: <IoCartOutline size={30} />,
  },
];

const Sidebar = async () => {
  const session = await auth();

  return (
    <aside className="ml-[-100%] fixed z-10 top-0 pb-3 px-6 w-full flex flex-col justify-between h-screen border-r bg-white transition duration-300 md:w-4/12 lg:ml-0 lg:w-[25%] xl:w-[20%] 2xl:w-[15%]">
      <div>
        <div className="-mx-6 px-6 py-4">
          <Link href="/dashboard" title="home">
            <Image
              src="https://tailus.io/sources/blocks/stats-cards/preview/images/logo.svg"
              alt="tailus logo"
              width={150}
              height={150}
            />
          </Link>
        </div>

        <div className="mt-8 text-center">
          <Image
            src={`${session?.user?.image}`}
            alt="user"
            className="w-10 h-10 m-auto rounded-full object-cover lg:w-28 lg:h-28"
            height={115}
            width={115}
          />
          <h5 className="hidden mt-4 text-xl font-semibold text-gray-600 lg:block">
            {session?.user?.name}
          </h5>
          <span className="hidden text-gray-400 lg:block">
            {session?.user?.email}
          </span>
        </div>

        <ul className="space-y-2 tracking-wide mt-8">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.name}
              name={item.name}
              href={item.href}
              icon={item.icon}
            />
          ))}
        </ul>
      </div>

      <div className="px-6 -mx-6 pt-4 flex justify-between items-center border-t">
        <button className="px-4 py-3 flex items-center space-x-4 rounded-md text-gray-600 group">
          <CiLogout />
          <span className="group-hover:text-gray-700">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
