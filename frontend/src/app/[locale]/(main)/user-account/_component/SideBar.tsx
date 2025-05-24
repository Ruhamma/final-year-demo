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
  IconBellRinging,
} from "@tabler/icons-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import React from "react";
import { usePathname } from "@/i18n/routing";

const SideBar = () => {
  const t = useTranslations("common.UserAccount");
  const pathname = usePathname();
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
      {profileData?.first_name ? <p className="font-bold text-lg mt-2 hidden sm:block">
        {profileData?.first_name} {profileData?.last_name} </p>:
      <p className="text-sm mt-1 hidden sm:block">{profileData?.username}</p>
        }

      <ul className="mt-6 space-y-4 w-fit px-2 mx-auto font-semibold">
        {[
          {
            href: "/user-account/profile-summary",
            icon: <IconUser size={18} />,
            label: t("ProfileSummary"),
          },
          {
            href: "/user-account/messages",
            icon: <IconMessageCircle size={18} />,
            label: t("Messages"),
          },         
          {
            href: "/user-account/notifications",
            icon: <IconBellRinging size={18} />,
            label: t("Notifications"),
          },
          {
            href: "/user-account/favorites",
            icon: <IconHeart size={18} />,
            label: t("Favorites"),
          },
          {
            href: "/user-account/orders",
            icon: <IconShoppingBag size={18} />,
            label: t("Orders"),
          },
          {
            href: "/logout",
            icon: <IconUsers size={18} />,
            label: t("Artists You Follow"),
          },
          {
            href: "/user-account/deactivate",
            icon: <IconUserX size={18} />,
            label: t("Deactivate Account"),
          },
        ].map((item, idx) => (
          <li key={idx}>
            <Link
              href={item.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-md  ${
                pathname === item.href
                  ? "bg-white text-[#606c38]"
                  : "text-white hover:bg-white hover:text-[#606c38]"
              }`}
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
            <span className="hidden sm:inline">{t('Logout')}</span>
          </button>
        </li>
      </ul>

      <Modal opened={opened} onClose={close} title={t('Logout')} centered size="md">
        <Center mb="md" className="flex flex-col items-center">
          <Text size="sm" className="font-bold">
           {t("Are you sure you want to log out?")}
          </Text>
          <Text size="sm" c="dimmed">
            {t("This action cannot be undone")}
          </Text>
          <Text size="sm" c="dimmed">
            {t("If you are sure, please click the button below to proceed")}
          </Text>
          <div className="flex justify-center mt-4">
            <Button color="red" onClick={() => logout()}>
             {t("Logout")}
            </Button>
          </div>
        </Center>
      </Modal>
    </div>
  );
};

export default SideBar;
