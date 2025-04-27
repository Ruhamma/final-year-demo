'use client';
import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/useAuth";

const SideBar = () => {
  const { user, logout } = useAuth();
  return (
    <div className="bg-[#606C38] text-white w-[350px] p-4 flex flex-col items-center justify-start h-screen mr-10 ">
      <Avatar
        className="text-xl text-white"
        size="xl"
        src="/images/Rectangle 20.png"
      />
      <p className="font-bold text-2xl pb-10">{user?.username}</p>
      <ul className="mt-4 space-y-2 text-gray-300">
        <li>
          <Link href="/artist-account/profile" className="text-white hover:text-gray-200 hover:underline">
            Edit profile
          </Link>
        </li>
        <li>
          <Link href="/artist-account/orders" className="text-white  hover:text-gray-200 hover:underline">
            Messages
          </Link>
        </li>
        <li>
          <Link href="/artist-account/artwork" className="text-white  hover:text-gray-200 hover:underline">
            Add art piece
          </Link>
        </li>
        <li>
          <Link href="/artist-account" className="text-white  hover:text-gray-200 hover:underline">
            All art works
          </Link>
        </li>
        <li>
          <Link href="/artist-account/settings" className="text-white  hover:text-gray-200 hover:underline">
            Account settings
          </Link>
        </li>
        <li>
          <Button
            onClick={() => {
              logout();
            }}
            className="text-white"
            variant='transparent'
            color="white"
          >
            Log out
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
