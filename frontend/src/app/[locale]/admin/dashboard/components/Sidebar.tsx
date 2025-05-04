'use client'

import Link from "next/link";
import React from "react";
import { IconHome, IconPaint, IconUser, IconShoppingCart, IconChartBar, IconBell } from "@tabler/icons-react";
import { usePathname } from "next/navigation";
const SideBar = () => {
  const pathname = usePathname();
  console.log(pathname)
  return (
    <div className="bg-[#606C38]/30 text-black  text-white w-1/6 p-4 flex flex-col items-center justify-start h-screen mr-10">
      <ul className="mt-4 space-y-4 text-gray-300">
        <li className={`flex items-center gap-2 hover:bg-[#606C38] hover:text-white rounded-md p-2 ${pathname === '/dashboard' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconHome size={20} color="black" className="hover:text-white"/>
          <Link href="/dashboard" className="text-black ">
            Dashboard
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/users' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconUser size={20} color="black" className="hover:text-white"/>
          <Link href="/users" className="text-black">
            Users
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/artists' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconPaint size={20} color="black" className="hover:text-white"/>
          <Link href="/artists" className="text-black">
            Artists 
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/artworks' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconPaint size={20} color="black" className="hover:text-white"/>
          <Link href="/artworks" className="text-black">
            Artworks
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/orders' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconShoppingCart size={20} color="black" className="hover:text-white"/>
          <Link href="/orders" className="text-black">
            Orders
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/reports' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconChartBar size={20} color="black" className="hover:text-white"/>
          <Link href="/reports" className="text-black">
            Report & Analytics
          </Link>
        </li>
        <li className={`flex items-center gap-2 hover:bg-[#606C38]  hover:text-white rounded-md p-2 ${pathname === '/notifications' ? 'bg-[#606C38] text-white' : ''}`}>
          <IconBell size={20} color="black" className="hover:text-white"/>
          <Link href="/notifications" className="text-black">
            Notifications
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
