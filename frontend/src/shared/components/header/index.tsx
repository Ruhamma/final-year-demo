'use client';
import {
  Box,
  Card,
  Stack,
  Flex,
  UnstyledButton,
  ActionIcon,
  Image,
  Menu,
  Text,
} from "@mantine/core";
import Link from "next/link";
import { IconShoppingCart, IconHeart, IconUserCircle , IconChevronDown, IconLogout} from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";
import { useParams } from "next/navigation";
import CartDrawer from "@/app/[locale]/(main)/_component/CartDrawer";
import WishlistDrawer from "@/app/[locale]/(main)/_component/WishlistDrawer";
import { useGetFavoritesQuery } from "@/store/api/artwork/artwork";
import { usePathname, useRouter } from "@/i18n/routing";
import { useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";

export function Header() {
  const { user, isAuthenticated, isAdmin , logout , isSeller} = useAuth();
const locale = useLocale();
  console.log(locale);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const [selected, setSelected] = useState(locale); 
   const changeLanguage = (nextLocale: any) => {
    console.log({ nextLocale });
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale },
      );
      setSelected(nextLocale);
    });
  };
  const t = useTranslations('common.NavBar');
  return (
    <Card bg={"#fffcea"} >
      <Box className="container mx-auto px-10">
        <Stack>
          <Flex justify="space-between" align="center" className="px-5">
            <Flex justify="space-between" align="center" gap={8}>
              <UnstyledButton
                className={`hover:border-b-[1px] tracking-[0.2em] ${selected === "am" ? "border-b-[1px]" : ""}`}
                     onClick={() => changeLanguage('am')}
>
                አማ
              </UnstyledButton>
              {"/"}
              <UnstyledButton className={`hover:border-b-[1px] tracking-[0.2em] ${selected === "en" ? "border-b-[1px]" : ""}`}      onClick={() => changeLanguage('en')}
>
                EN
              </UnstyledButton>
            </Flex>
            <Image src={"/logo.png"} alt="Logo" width={52} height={23} />
            <Flex justify="space-between" align="center" py={10} gap={20}>
              {!isAuthenticated ? (
                <>
                  {" "}
                  <Link
                    href={"/auth/sign-up"}
                    className="tracking-[0.3em] hover:border-b-[1px]"
                  >
                   {t('SignUp')}
                  </Link>
                  {"/"}
                  <Link
                    href={"/auth/login"}
                    className="tracking-[0.3em] hover:border-b-[1px]"
                  >
                    {t('Login')}
                  </Link>
                </>
              ) : (
                <Menu shadow="md" width={200}>
                <Menu.Target>
                  <Flex
                    align={'center'}
                    justify={'center'}
                    columnGap={4}
                    className="cursor-pointer"
                  >
                    <Flex className="items-center gap-1">
                      <IconUserCircle size={19} stroke={1.2} />
                      <Text fz={14}>
                        {t('Hi')}, {user?.username}
                      </Text>
                      <IconChevronDown size={16} stroke={1.6} />
                    </Flex>
                  </Flex>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    leftSection={<IconUserCircle />}
                    onClick={() => {
                      if (isAdmin) {
                        router.push("/admin-account");
                      } else if (isSeller) {
                        router.push("/artist-account");
                      } else {
                        router.push("/user-account");
                      }
                    }}
                  >
                    {t('Account')}
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout />}
                    onClick={() => {
                      logout()
                    }}
                  >
                   {t('Logout')}
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              )}
              {isAdmin && (
                <Link
                  href={"/admin"}
                  className="tracking-[0.3em] hover:border-b-[1px]"
                >
                 {t('Admin')}
                </Link>
              )}
              <ActionIcon
                variant="transparent"
                size="lg"
                radius="xl"
                color="dark"
                mr={2}
              >
                <CartDrawer />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                size="lg"
                radius="xl"
                color="dark"
                mr={5}
              >
                <WishlistDrawer />
              </ActionIcon>
            </Flex>
          </Flex>
          <Flex align={"center"} justify={"space-between"} className="text-sm">
            <Flex gap={50}>
              <Link
                href={"/"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                {t('Home')}
              </Link>
              <Link
                href={"/about-us"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                {t('About')}
              </Link>
              <Link
                href={"/contact-us"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                {t('Contact')}
              </Link>
            </Flex>
            <Flex gap={50}>
              <Link
                href={"/artworks"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                {t('Artworks')}
              </Link>
              <Link
                href={"/artists"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                {t('Artists')}
              </Link>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Card>
  );
}
