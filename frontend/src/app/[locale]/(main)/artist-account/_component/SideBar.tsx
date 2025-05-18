"use client";
import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/useAuth";
import { usePathname } from "next/navigation";
import { useGetArtistProfileQuery } from "@/store/api/artist/profile";
import {
  IconBrush,
  IconUserEdit,
  IconMail,
  IconPlus,
  IconUsers,
  IconBan,
  IconLogout,
  IconShoppingCart,
} from "@tabler/icons-react";

const SideBar = () => {
  const { user, logout } = useAuth();
  const { data: profileData } = useGetArtistProfileQuery({});
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;

  const menuItems = [
    {
      label: "Dashboard",
      icon: <IconBrush size={18} />,
      href: "/artist-account",
    },
    {
      label: "All artworks",
      icon: <IconBrush size={18} />,
      href: "/artist-account/all-artworks",
    },
    {
      label: "Edit profile",
      icon: <IconUserEdit size={18} />,
      href: "/artist-account/profile",
    },
    {
      label: "Messages",
      icon: <IconMail size={18} />,
      href: "/artist-account/orders",
    },
    {
      label: "Orders",
      icon: <IconShoppingCart size={18} />,
      href: "/artist-account/orders",
    },
    {
      label: "Add art piece",
      icon: <IconPlus size={18} />,
      href: "/artist-account/artwork",
    },
    {
      label: "Followers",
      icon: <IconUsers size={18} />,
      href: "/artist-account/Followers",
    },
    {
      label: "Deactivate account",
      icon: <IconBan size={18} />,
      href: "/artist-account/deactivate",
    },
  ];

  return (
    <div className="bg-[#606C38] text-white w-1/4 p-6 flex flex-col items-center min-h-screen mr-10">
      <Avatar
        className="text-xl text-white"
        size="xl"
        src={profileData?.profile_picture}
      />
      <p className="font-bold text-2xl pb-8 mt-4">{user?.username}</p>

      <ul className="w-fit mx-auto space-y-2 text-gray-200">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-white text-black"
                  : "hover:bg-white hover:text-black"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          </li>
        ))}
        <li>
          <Button
            onClick={() => logout()}
            leftSection={<IconLogout size={18} />}
            className="text-white hover:text-black hover:bg-white w-full justify-start"
            variant="transparent"
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
