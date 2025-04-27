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
import { useRouter } from "next/navigation";

export function Header() {
 const router = useRouter();
  const { user, isAuthenticated, isAdmin , logout , isSeller} = useAuth();
  return (
    <Card bg={"#fffcea"}>
      <Box className="container mx-auto">
        <Stack>
          <Flex justify="space-between" align="center">
            <Flex justify="space-between" align="center" gap={8}>
              <UnstyledButton className="hover:border-b-[1px] tracking-[0.2em]">
                AM
              </UnstyledButton>
              {"/"}
              <UnstyledButton className="hover:border-b-[1px] tracking-[0.2em]">
                EN
              </UnstyledButton>
            </Flex>
            <Image src={"/logo.png"} alt="Logo" width={72} height={43} />
            <Flex justify="space-between" align="center" py={10} gap={20}>
              {!isAuthenticated ? (
                <>
                  {" "}
                  <Link
                    href={"/auth/sign-up"}
                    className="tracking-[0.3em] hover:border-b-[1px]"
                  >
                    Sign Up
                  </Link>
                  {"/"}
                  <Link
                    href={"/auth/login"}
                    className="tracking-[0.3em] hover:border-b-[1px]"
                  >
                    Login
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
                        Hi, {user?.username}
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
                    Account
                  </Menu.Item>
                  <Menu.Item
                    leftSection={<IconLogout />}
                    onClick={() => {
                      logout()
                    }}
                  >
                    Log out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
              )}
              {isAdmin && (
                <Link
                  href={"/admin"}
                  className="tracking-[0.3em] hover:border-b-[1px]"
                >
                  Admin
                </Link>
              )}
              <ActionIcon
                variant="transparent"
                size="lg"
                radius="xl"
                color="dark"
                mr={5}
              >
                <IconShoppingCart size={20} stroke={1.5} />
              </ActionIcon>
              <ActionIcon
                variant="transparent"
                size="lg"
                radius="xl"
                color="dark"
                mr={5}
              >
                <IconHeart size={20} stroke={1.5} />
              </ActionIcon>
            </Flex>
          </Flex>
          <Flex align={"center"} justify={"space-between"}>
            <Flex gap={50}>
              <Link
                href={"#"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                Home
              </Link>
              <Link
                href={"/about-us"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                About
              </Link>
              <Link
                href={"/contact-us"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                Contact
              </Link>
            </Flex>
            <Flex gap={50}>
              <Link
                href={"/artworks"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                Artworks
              </Link>
              <Link
                href={"/artists"}
                className=" tracking-[0.3em] hover:border-b-[1px]"
              >
                Artist
              </Link>
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Card>
  );
}
