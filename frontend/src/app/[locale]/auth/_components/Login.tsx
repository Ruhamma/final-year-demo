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
import { useAuth, useLoginMutation } from "@/app/services/auth";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const route = useRouter();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { isAuthenticated, user } = useAuth();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      route.push("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Container className="min-h-screen flex items-center justify-center px-4">
      <Flex
        align={"center"}
        justify={"center"}
        gap="lg"
        direction={{ base: "column", md: "row" }}
        className="w-full max-w-6xl"
      >
        {/* Form Section */}
        <Paper className="w-full md:w-1/2 p-6 sm:p-10" shadow="md" radius="md">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="md">
              <Text fw={600} fz={24} ta="center">
                Welcome Back!
              </Text>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                {...registerField("email")}
                error={errors.email?.message}
              />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                {...registerField("password")}
                error={errors.password?.message}
              />
              <Button type="submit" loading={isLoginLoading} fullWidth>
                Login
              </Button>
            </Flex>
          </form>

          {/* OAuth Buttons */}
          <Flex direction="column" gap="sm" mt="lg">
            <Button
              variant="outline"
              leftSection={<IconBrandGoogle size={16} />}
              fullWidth
            >
              Continue with Google
            </Button>
            <Button
              variant="outline"
              leftSection={<IconBrandFacebook size={16} />}
              fullWidth
            >
              Continue with Facebook
            </Button>
            <Button
              variant="outline"
              leftSection={<IconApple size={16} />}
              fullWidth
            >
              Continue with Apple
            </Button>
          </Flex>

          {/* Sign Up Link */}
          <Flex justify="center" mt="md">
            <Text fz={14}>
              Don’t have an account?{" "}
              <Text
                component="a"
                href="/auth/sign-up"
                c="blue"
                fw={500}
                onClick={(e) => {
                  e.preventDefault();
                  route.push("/auth/sign-up");
                }}
              >
                Sign up
              </Text>
            </Text>
          </Flex>
        </Paper>

        {/* Image Section */}
        <Box className="w-full hidden md:flex md:w-1/2 h-[400px] mt-6 md:mt-0">
          <Image
            src="/images/Product Image.png"
            alt="Login Illustration"
            className="rounded-md"
            width="100%"
          />
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;
