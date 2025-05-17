"use client";
import { useGetMeQuery } from "@/app/services/auth";
import { useAuth } from "@/context/useAuth";
import { Avatar, Button, Center, Modal, Text } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
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
  const [opened, { open, close }] = useDisclosure(false);
  const { logout } = useAuth();
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
            href="/user-account/favorites"
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
            href="#"
            onClick={() => open()}
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
          >
            <IconPower size={18} /> Log Out
          </Link>
        </li>
        <Modal
          opened={opened}
          onClose={close}
          title="Log out"
          centered
          size="md"
        >
          <Center mb="md" className="flex flex-col items-center">
            <Text size="sm" className="font-bold">
              Are you sure you want to log out?
            </Text>
            <Text size="sm" c="dimmed">
              This action cannot be undone.
            </Text>
            <Text size="sm" c="dimmed">
              If you are sure, please click the button below to proceed.
            </Text>
            <div className="flex justify-center mt-4">
              <Button color="red" onClick={() => logout()}>
                Log Out
              </Button>
            </div>
          </Center>
        </Modal>
      </ul>
    </div>
  );
};

export default SideBar;
