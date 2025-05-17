"use client";
import { useGetMeQuery } from "@/app/services/auth";
import { Avatar, Text } from "@mantine/core";
import {
  IconUser,
  IconMessageCircle,
  IconHeart,
  IconShoppingBag,
  IconUsers,
  IconPower,
  IconUserX,
} from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

const SideBar = () => {
  const { data: profileData } = useGetMeQuery();

  return (
    <div className="bg-[#606C38] text-white w-1/4 p-4 flex flex-col items-center h-screen mr-10">
      <Avatar
        className="text-xl text-white"
        size="xl"
        src={profileData?.profile_picture}
        alt="Profile"
      />
      <Text className="font-bold text-2xl mt-2">{"User"}</Text>
      <ul className="mt-6 space-y-4 w-fit px-2 mx-auto font-semibold">
        <li>
          <Link
            href="/user-account/profile-summary"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconUser size={18} /> Profile Summary
          </Link>
        </li>
        <li>
          <Link
            href="/orders"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconMessageCircle size={18} /> Messages
          </Link>
        </li>
        <li>
          <Link
            href="/settings"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconHeart size={18} /> Favorites
          </Link>
        </li>
        <li>
          <Link
            href="/user-account/orders"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconShoppingBag size={18} /> Orders
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconUsers size={18} /> Artists You Follow
          </Link>
        </li>
        <li>
          <Link
            href="/user-account/deactivate"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconUserX size={18} /> Deactivate Account
          </Link>
        </li>
        <li>
          <Link
            href="/logout"
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconPower size={18} /> Log Out
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
