import { Avatar } from "@mantine/core";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  return (
    <div className="bg-[#606C38] text-white w-1/4 p-4 flex flex-col items-center justify-start h-screen mr-10">
      <Avatar
        className="text-xl text-white"
        size="xl"
        src="/images/Rectangle 20.png"
      />
      <p className="font-bold text-2xl pb-10">Bilen Assefa</p>
      <ul className="mt-4 space-y-2 text-gray-300">
        <li>
          <Link href="/dashboard" className="text-white">
            Edit profile
          </Link>
        </li>
        <li>
          <Link href="/orders" className="text-white">
            Messages
          </Link>
        </li>
        <li>
          <Link href="/settings" className="text-white">
            Add art piece
          </Link>
        </li>
        <li>
          <Link href="/logout" className="text-white">
            All art works
          </Link>
        </li>
        <li>
          <Link href="/logout" className="text-white">
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
