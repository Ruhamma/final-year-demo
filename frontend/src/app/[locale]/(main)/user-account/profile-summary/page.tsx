"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  TextInput,
  Button,
  Group,
  Text,
  Paper,
  Avatar,
  Stack,
  Divider,
  Title,
  Box,
  Flex,
  LoadingOverlay,
  Alert,
  Accordion,
  PasswordInput,
  FileInput,
  Image,
  Modal,
} from "@mantine/core";
import {
  IconPhone,
  IconX,
  IconAlertCircle,
  IconMessage,
  IconPassword,
  IconEye,
} from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";
import { notify } from "@/shared/components/notification/notification";
import {
  useGetMeQuery,
  useUpdateUserProfileMutation,
} from "@/app/services/auth";
import { useChangePasswordMutation } from "@/store/api/users/page";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { useDisclosure } from "@mantine/hooks";

const profileSchema = z.object({
  first_name: z.string().optional().nullable(),
  last_name: z.string().optional().nullable(),
  email: z.string().email("Invalid email").nullable(),
  phone_number: z.string().optional().nullable(),
  username: z.string().optional(),
});

const changeEmailSchema = z.object({
  email: z.string().email("Invalid email").nullable(),
});

const changePasswordSchema = z
  .object({
    old_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .nullable(),
    new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .nullable(),
    confirm_new_password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[a-z]/, "Password must contain at least one lowercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .nullable(),
  })
  .refine((data) => data.new_password === data.confirm_new_password, {
    message: "Passwords don't match",
    path: ["confirm_new_password"],
  })
  .refine((data) => data.old_password !== data.new_password, {
    message: "New password cannot be the same as the old password",
    path: ["new_password"],
  });

type ProfileFormValues = z.infer<typeof profileSchema>;
type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;
type ChangePasswordFormValues = z.infer<typeof changePasswordSchema>;

const ProfileForm = () => {
  const { user } = useAuth();
  const [selectedFile, setSelectedFile] = React.useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);
  const [opened, { open, close }] = useDisclosure(false);
  const { data: profileData, isLoading, isError } = useGetMeQuery();
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useChangePasswordMutation();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
  });

  const {
    register: registerChangeEmail,
    handleSubmit: handleSubmitChangeEmail,
    formState: { errors: errorsChangeEmail, isDirty: isDirtyChangeEmail },
    reset: resetChangeEmail,
  } = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(changeEmailSchema),
  });

  const {
    register: registerChangePassword,
    handleSubmit: handleSubmitChangePassword,
    formState: { errors: errorsChangePassword, isDirty: isDirtyChangePassword },
  } = useForm<ChangePasswordFormValues>({
    resolver: zodResolver(changePasswordSchema),
  });

  React.useEffect(() => {
    if (profileData) {
      reset(profileData);
      setPreviewUrl(profileData?.profile_picture || null);
      resetChangeEmail(profileData);
    }
  }, [profileData, reset]);

  React.useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);
  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();
    const userData = Object.entries(data).reduce((acc, [key, value]) => {
      if (value !== undefined && value !== null) {
        acc[key] = value;
      }
      return acc;
    }, {} as Record<string, any>);

    formData.append("user_data", JSON.stringify(userData));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }

    try {
      await updateProfile(formData).unwrap();
      notify("Success", "Profile updated successfully");
    } catch (error) {
      notify("Error", "Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  };

  const onSubmitChangeEmail = (data: ProfileFormValues) => {
    openConfirmModal({
      title: "Confirm",
      children: (
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Confirm Email update"
          color="red"
        >
          Are you sure you want to update your email?
        </Alert>
      ),
      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },
      onConfirm: async () => {
        try {
          await updateProfile(data).unwrap();
          notify("Success", "Email updated successfully");
          closeAllModals();
        } catch (error) {
          notify("Error", "Failed to update email");
          console.error("Failed to update email:", error);
        }
      },
    });
  };
  const handleCancel = () => {
    if (profileData) {
      reset(profileData);
      setSelectedFile(null);
      setPreviewUrl(profileData?.profile_picture || null);
    }
  };

  const onSubmitChangePassword = async (data: ChangePasswordFormValues) => {
    openConfirmModal({
      title: "Confirm",
      children: (
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Confirm Password update"
          color="red"
        >
          Are you sure you want to update your password?
        </Alert>
      ),
      labels: {
        confirm: "Confirm",
        cancel: "Cancel",
      },
      onConfirm: async () => {
        try {
          await updatePassword(data).unwrap();
          notify("Success", "Password updated successfully");
          closeAllModals();
        } catch (error) {
          notify("Error", "Failed to update password");
          console.error("Failed to update password:", error);
        }
      },
    });
  };

  if (isLoading) return <LoadingOverlay visible />;
  if (isError) {
    return (
      <div className="w-3/4">
        <Alert
          icon={<IconAlertCircle size={18} />}
          title="Error loading profile"
          color="red"
        >
          Failed to load profile. Please try again later.
        </Alert>
      </div>
    );
  }
  return (
    <Paper p="xl" bg="none" className="px-56">
      <Stack gap="lg">
        <Group>
          <Avatar
            size="xl"
            radius="2xl"
            src={previewUrl || profileData?.profile_picture}
          />
          <Box>
            <Title order={4}>Hello, {user?.username}</Title>
            <Text c="dimmed" size="sm">
              Joined in {new Date(user?.created_at || "").getFullYear()}
            </Text>
          </Box>
        </Group>

        <Divider />

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack gap="md">
            <Flex gap="md" className="w-full flex-grow">
              <TextInput
                label="First Name"
                {...register("first_name")}
                error={errors.first_name?.message}
                className="flex-grow"
              />
              <TextInput
                label="Last Name"
                {...register("last_name")}
                error={errors.last_name?.message}
                className="flex-grow"
              />
            </Flex>
            <Flex gap="md" className="w-full flex-grow">
              <Box className="flex-grow">
                <FileInput
                  label="Profile Picture"
                  placeholder="Upload image"
                  value={selectedFile}
                  onChange={setSelectedFile}
                  accept="image/*"
                  clearable
                  radius="md"
                  leftSection={
                    <IconEye
                      onClick={open}
                      size={20}
                      className="cursor-pointer flex-grow"
                    />
                  }
                  className="flex-grow"
                />

                <Modal opened={opened} onClose={close}>
                  {previewUrl && (
                    <Image radius="md" src={previewUrl} alt="Preview" />
                  )}
                </Modal>
              </Box>
              <TextInput
                label="Username"
                {...register("username")}
                error={errors.username?.message}
                className="flex-grow"
              />
            </Flex>
            <Divider
              my="sm"
              label="Contact & Social Media"
              labelPosition="center"
            />
            <TextInput
              label="Email"
              type="email"
              {...register("email")}
              error={errors.email?.message}
              required
              disabled
              className="flex-grow"
            />
            <TextInput
              label="Phone Number"
              leftSection={<IconPhone size={16} />}
              placeholder="+251 900 000 000"
              {...register("phone_number")}
              error={errors.phone_number?.message}
              className="flex-grow"
            />

            <Group justify="flex-end" mt="md">
              <Button
                variant="subtle"
                type="button"
                leftSection={<IconX size={16} />}
                onClick={handleCancel}
                disabled={!isDirty}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!isDirty || isUpdating}
                loading={isUpdating}
              >
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>

        <Divider my="sm" label="Account Settings" labelPosition="center" />

        <Accordion variant="contained">
          <Accordion.Item value="photos">
            <Accordion.Control
              icon={
                <IconMessage size={20} color="var(--mantine-color-red-6)" />
              }
            >
              Change Email
            </Accordion.Control>
            <Accordion.Panel>
              <form onSubmit={handleSubmitChangeEmail(onSubmitChangeEmail)}>
                <Stack gap="md">
                  <TextInput
                    label="Email"
                    type="email"
                    {...registerChangeEmail("email")}
                    error={errorsChangeEmail.email?.message}
                  />
                  <Group justify="flex-end" mt="md">
                    <Button
                      variant="subtle"
                      type="button"
                      leftSection={<IconX size={16} />}
                      onClick={handleCancel}
                      disabled={!isDirtyChangeEmail}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isDirtyChangeEmail || isUpdating}
                    >
                      Save Changes
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Accordion variant="contained">
          <Accordion.Item value="photos">
            <Accordion.Control
              icon={
                <IconPassword size={20} color="var(--mantine-color-red-6)" />
              }
            >
              Change Password
            </Accordion.Control>
            <Accordion.Panel>
              <form
                onSubmit={handleSubmitChangePassword(onSubmitChangePassword)}
              >
                <Stack gap="md">
                  <PasswordInput
                    label="Old Password"
                    type="password"
                    {...registerChangePassword("old_password")}
                    error={errorsChangePassword.old_password?.message}
                    autoComplete="current-password"
                  />
                  <PasswordInput
                    label="New Password"
                    type="password"
                    {...registerChangePassword("new_password")}
                    error={errorsChangePassword.new_password?.message}
                    autoComplete="new-password"
                  />
                  <PasswordInput
                    label="Confirm New Password"
                    type="password"
                    {...registerChangePassword("confirm_new_password")}
                    error={errorsChangePassword.confirm_new_password?.message}
                    autoComplete="new-password"
                  />
                  <Group justify="flex-end" mt="md">
                    <Button
                      variant="subtle"
                      type="button"
                      leftSection={<IconX size={16} />}
                      onClick={handleCancel}
                      disabled={!isDirtyChangePassword}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={!isDirtyChangePassword || isUpdatingPassword}
                    >
                      Save Changes
                    </Button>
                  </Group>
                </Stack>
              </form>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>
      </Stack>
    </Paper>
  );
};

export default ProfileForm;
