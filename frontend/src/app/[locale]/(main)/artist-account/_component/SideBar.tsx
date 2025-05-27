"use client";
import { Avatar, Button } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/useAuth";
import { usePathname } from "@/i18n/routing";
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
  IconDashboard,
  IconBellRinging,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";

const SideBar = () => {
  const { user, logout } = useAuth();
  const { data: profileData } = useGetArtistProfileQuery({});
  const pathname = usePathname();
  const isActive = (path: string) => pathname === path;
  const t = useTranslations("common.ArtistAccount");

  const menuItems = [
    {
      label: t("Dashboard"),
      icon: <IconDashboard size={18} />,
      href: "/artist-account",
    },
    {
      label: t("AllArtworks"),
      icon: <IconBrush size={18} />,
      href: "/artist-account/all-artworks",
    },
    {
      label: t("EditProfile"),
      icon: <IconUserEdit size={18} />,
      href: "/artist-account/profile",
    },
    {
      label: t("Messages"),
      icon: <IconMail size={18} />,
      href: "/artist-account/messages",
    },
    {
      href: "/artist-account/notifications",
      icon: <IconBellRinging size={18} />,
      label: t("Notifications"),
    },
    {
      label: t("Orders"),
      icon: <IconShoppingCart size={18} />,
      href: "/artist-account/orders",
    },
    {
      label: t("AddArtPiece"),
      icon: <IconPlus size={18} />,
      href: "/artist-account/artwork",
    },
    {
      label: t("Followers"),
      icon: <IconUsers size={18} />,
      href: "/artist-account/followers",
    },
    {
      label: t("Deactivate Account"),
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
              <span className="hidden sm:inline">{item.label}</span>
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
            <span className="hidden sm:inline">{t("Logout")}</span>
          </Button>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
