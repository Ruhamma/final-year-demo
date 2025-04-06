"use client";
import {
  Box,
  Button,
  Container,
  Flex,
  Image,
  Paper,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import {
  IconApple,
  IconBrandFacebook,
  IconBrandGoogle,
} from "@tabler/icons-react";
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
        <Paper className="w-1/2 p-10">
          <form>
            <Flex direction="column" gap="md">
              <Flex align="center" justify="center">
                <Text fw={600} fz={22}>
                  Welcome Back!
                </Text>
              </Flex>
              <TextInput label="Email" placeholder="Enter your email" />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
              />
              <Button type="submit">Login</Button>
            </Flex>
          </form>
          <Flex direction="column" gap="sm" mt="lg">
            <Button
              variant="outline"
              leftSection={<IconBrandGoogle width={16} />}
              fullWidth
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              leftSection={<IconBrandFacebook width={16} />}
              fullWidth
            >
              Continue with Facebook
            </Button>
            <Button
              variant="outline"
              leftSection={<IconApple width={16} />}
              fullWidth
            >
              Continue with Apple
            </Button>
            <Flex justify="center" mt="md">
              <Text>
                Dont have an account?{" "}
                <Text
                  component="a"
                  href="/signup"
                  c="blue"
                  inherit
                  onClick={() => route.push("/auth/sign-up")}
                >
                  Sign up
                </Text>
              </Text>
            </Flex>
          </Flex>
        </Paper>
        <Box className="w-1/2">
          <Image
            src="/images/Product Image.png"
            alt="Login Image"
            radius={20}
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
