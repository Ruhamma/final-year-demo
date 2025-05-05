"use client";
import { useRegisterMutation } from "@/app/services/auth";
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
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { notify } from "@/shared/components/notification/notification";


const signUpSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .min(1, 'Email is required'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  role: z.enum(['ADMIN'], {
    errorMap: () => ({ message: 'Please select a valid role' }),
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

const Login = () => {
  const route = useRouter();
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation();

  const {
    register: registerField,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      role: 'ADMIN',
    },
  });

   const onSubmit = async (data: SignUpFormData) => {
    try {
      await register({
        email: data.email,
        username: data.username,
        password: data.password,
        confirm_password: data.confirmPassword,
        role: data.role
      }).unwrap();
       route.push('/auth/login');
      notify("Success","Registered successfuly")
    } catch (error: any) {
      notify("Error","Registeration failed")
      if (error.data) {
        Object.entries(error.data).forEach(([key, value]) => {
          setError(key as keyof SignUpFormData, {
            type: 'server',
            message: Array.isArray(value) ? value[0] : value as string,
          });
        });
      }
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
          <Flex align="center" justify="center">
            <Text fw={600} fz={22}>
              Get started
            </Text>
          </Flex>
              {" "}
              <form onSubmit={handleSubmit(onSubmit)}>
                <Flex direction="column" gap="md">
                  <TextInput 
                  label="Name" 
                  placeholder="Enter your Name"
                  {...registerField('username')}
                  autoComplete="username"
                  error={errors.username?.message}
                  />
                  <TextInput 
                  label="Email" 
                  placeholder="Enter your email" 
                  {...registerField('email')}
                  autoComplete="email"
                  error={errors.email?.message}
                  />
                   <PasswordInput
                    label="Password"
                    placeholder="Enter your password"
                    {...registerField('password')}  
                    autoComplete="password"
                    error={errors.password?.message}
                  />
                  <PasswordInput
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    {...registerField('confirmPassword')}
                    autoComplete="confirmPassword"
                    error={errors.confirmPassword?.message}
                  />
                  <Button type="submit" loading={isRegisterLoading}>Sign up</Button>
                </Flex>
              </form>

          <Flex direction="column" gap="sm" mt="lg">
            <Flex justify="center" mt="md">
              <Text>
                Already have an account?{" "}
                <Text
                  component="a"
                  c="blue"
                  inherit
                  onClick={() => route.push("/auth")}
                  className="cursor-pointer"
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
