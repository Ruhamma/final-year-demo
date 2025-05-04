'use client'
import React from "react";
import { Card, Box, Stack, Flex, UnstyledButton, Menu, Text } from "@mantine/core";
import { IconUserCircle, IconChevronDown, IconLogout, IconSearch, IconBell } from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";

export default function Header() {
  const { user , logout } = useAuth();
  return (
     <Box bg={"#606C38"} className="w-full rounded-none p-4">
      <Box className="container mx-auto">
        <Stack>
          <Flex justify="space-between" align="center">          
            <p className="text-white font-bold text-xl pl-4">Admin Dashboard</p>         
            <Flex justify="space-between" align="center" py={10} gap={20}>            
             <Menu shadow="md" width={200} >
                <Menu.Target>
                  <Flex
                    align={'center'}
                    justify={'center'}
                    columnGap={4}
                    className="cursor-pointer"
                  >
                    <Flex className="items-center gap-1 text-white pr-4">
                      <IconUserCircle size={19} stroke={1.2} className="text-white" />
                      <Text fz={14} className="text-white font-semibold">
                        Hi, {user?.username}
                      </Text>
                      <IconChevronDown size={16} stroke={1.6} className="text-white" />
                    </Flex>
                  </Flex>
                </Menu.Target>

                <Menu.Dropdown>
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
            </Flex>
          </Flex>
        </Stack>
      </Box>
    </Box>
  );
}
