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
    <div className="bg-[#606C38] text-white  sm:w-1/4 sm:p-4 flex flex-col items-center sm:h-screen h-auto">
      <Avatar
        className="text-xl text-white"
        size="xl"
        src={profileData?.profile_picture}
        alt="Profile"
      />
      <p className="font-bold text-lg mt-2 hidden sm:block">
        {profileData?.first_name} {profileData?.last_name}
      </p>
      <p className="text-sm mt-1 hidden sm:block">{"User"}</p>

      <ul className="mt-6 space-y-4 w-fit px-2 mx-auto font-semibold">
        {[
          {
            href: "/user-account/profile-summary",
            icon: <IconUser size={18} />,
            label: "Profile Summary",
          },
          {
            href: "/orders",
            icon: <IconMessageCircle size={18} />,
            label: "Messages",
          },
          {
            href: "/user-account/favorites",
            icon: <IconHeart size={18} />,
            label: "Favorites",
          },
          {
            href: "/user-account/orders",
            icon: <IconShoppingBag size={18} />,
            label: "Orders",
          },
          {
            href: "/logout",
            icon: <IconUsers size={18} />,
            label: "Artists You Follow",
          },
          {
            href: "/user-account/deactivate",
            icon: <IconUserX size={18} />,
            label: "Deactivate Account",
          },
        ].map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md"
            >
              {item.icon}
              <span className="hidden sm:inline">{item.label}</span>
            </Link>
          </li>
        ))}

        <li>
          <button
            onClick={() => open()}
            className="flex items-center gap-2 text-white hover:bg-white hover:text-[#606c38] px-4 py-2 rounded-md w-full text-left"
          >
            <IconPower size={18} />
            <span className="hidden sm:inline">Log Out</span>
          </button>
        </li>
      </ul>

      <Modal opened={opened} onClose={close} title="Log out" centered size="md">
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
    </div>
  );
};

export default SideBar;
