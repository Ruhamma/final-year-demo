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
import { notify } from "@/shared/components/notification/notification";

const loginSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

type LoginFormData = z.infer<typeof loginSchema>;

const Login = () => {
  const route = useRouter();
  const [login, { isLoading: isLoginLoading }] = useLoginMutation();
  const { isAuthenticated, user } = useAuth();
  console.log(isAuthenticated,user)
  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data).unwrap();
      notify("Success","Logged in successfuly")
    } catch (error) {
      notify("Error","Failed to login")
      console.error('Login failed:', error);
    }
  };

  return (
    <Container className="h-screen m-auto ">
      <Flex
        align={"center"}
        justify={"space-evenly"}
        gap="20"
        className="mt-20"
      >
        <Paper className="w-1/2 p-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex direction="column" gap="md">
              <Flex align="center" justify="center">
                <Text fw={600} fz={22}>
                  Welcome Back!
                </Text>
              </Flex>
              <TextInput label="Email" placeholder="Enter your email" {...registerField('email')} error={errors.email?.message} />
              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                {...registerField('password')}  
                error={errors.password?.message}
              />
              <Button type="submit" loading={isLoginLoading}>Login</Button>
            </Flex>
          </form>         
        </Paper>
      </Flex>
    </Container>
  );
};

export default Login;
