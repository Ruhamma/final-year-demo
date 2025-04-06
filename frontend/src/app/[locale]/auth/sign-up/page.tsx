"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  Text,
  TextInput,
} from "@mantine/core";
import { useRouter } from "next/navigation";
import React from "react";

const Login = () => {
  const route = useRouter();
  return (
    <Container className="h-screen m-auto ">
      <Flex
        align={"center"}
        justify={"space-evenly"}
        gap="20"
        className="mt-20"
      >
        <Box className="w-1/2">
          <Image
            src="/images/Product Image.png"
            alt="Login Image"
            radius={20}
          />
        </Box>
        <Paper className="w-1/2 p-10">
          <Flex align="center" justify="center">
            <Text fw={600} fz={22}>
              Get started
            </Text>
          </Flex>
          <Tabs defaultValue="gallery">
            <TabsList className="my-8" grow>
              <TabsTab value="gallery">Buyer</TabsTab>
              <TabsTab value="messages">Seller</TabsTab>
            </TabsList>
            <TabsPanel value="gallery">
              {" "}
              <form>
                <Flex direction="column" gap="md">
                  <TextInput label="Name" placeholder="Enter your Name" />

                  <TextInput label="Email" placeholder="Enter your email" />
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                  />
                  <Button type="submit">Login</Button>
                </Flex>
              </form>
            </TabsPanel>
            <TabsPanel value="messages">
              {" "}
              <form>
                <Flex direction="column" gap="md">
                  <TextInput label="Name" placeholder="Enter your Name" />

                  <TextInput label="Email" placeholder="Enter your email" />
                  <TextInput
                    label="Art style"
                    placeholder="Enter your art style"
                  />
                  <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                  />
                  <Button type="submit">Sign up</Button>
                </Flex>
              </form>
            </TabsPanel>
          </Tabs>

          <Flex direction="column" gap="sm" mt="lg">
            <Flex justify="center" mt="md">
              <Text>
                Already have an account?{" "}
                <Text
                  component="a"
                  href="/signup"
                  c="blue"
                  inherit
                  onClick={() => route.push("/auth")}
                >
                  Login
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Paper>
      </Flex>
    </Container>
  );
};

export default Login;
