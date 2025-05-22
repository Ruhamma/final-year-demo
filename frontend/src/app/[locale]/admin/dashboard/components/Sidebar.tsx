"use client";

import Link from "next/link";
import React from "react";
import {
  IconHome,
  IconPaint,
  IconUser,
  IconShoppingCart,
  IconChartBar,
} from "@tabler/icons-react";
import { usePathname } from "next/navigation";

const SideBar = () => {
  const pathname = usePathname();

  const isActive = (path) => {
    return pathname?.endsWith(path);
  };

  return (
    <div className="bg-gradient-to-b from-[#606C38] to-[#283618] text-white w-64 min-h-[60vh] p-6 flex flex-col shadow-xl">
      <ul className="space-y-2 mt-10">
        <li>
          <Link
            href="/admin/dashboard"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/dashboard")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconHome size={22} className="flex-shrink-0" />
            <span>Dashboard</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/dashboard/users"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/users")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconUser size={22} className="flex-shrink-0" />
            <span>Users</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/dashboard/artists"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/artists")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconUser size={22} className="flex-shrink-0" />
            <span>Artists</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/dashboard/artworks"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/artworks")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconPaint size={22} className="flex-shrink-0" />
            <span>Artworks</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/dashboard/orders"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/orders")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconShoppingCart size={22} className="flex-shrink-0" />
            <span>Orders</span>
          </Link>
        </li>

        <li>
          <Link
            href="/admin/dashboard/metadata"
            className={`flex items-center gap-3 p-3 rounded-lg transition-all duration-200 hover:bg-[#FEFAE0] hover:text-[#283618] ${
              isActive("/metadata")
                ? "bg-[#FEFAE0] text-[#283618] font-medium"
                : ""
            }`}
          >
            <IconChartBar size={22} className="flex-shrink-0" />
            <span>Metadata</span>
          </Link>
        </li>
      </ul>

      <div className="flex-grow"></div>

      <div className="pb-4">
        <div className="border-t border-[#FEFAE0]/20 pt-4">
          <div className="flex items-center gap-3 p-2 text-white/80 hover:text-white cursor-pointer">
            <IconUser size={20} />
            <span>Admin Account</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
