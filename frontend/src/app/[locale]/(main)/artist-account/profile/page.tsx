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
  Textarea,
  LoadingOverlay,
  Alert,
  Modal,
  FileInput,
  Image,
  Accordion,
  PasswordInput,
} from "@mantine/core";
import {
  IconWorld,
  IconPhone,
  IconBrandInstagram,
  IconBrandFacebook,
  IconBrandTiktok,
  IconBrandYoutube,
  IconX,
  IconAlertCircle,
  IconEye,
  IconPassword,
  IconMessage,
  IconPhoto,
} from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";
import {
  useGetArtistProfileQuery,
  useUpdateArtistProfileMutation,
  useUpdateEmailMutation,
  useChangePasswordMutation,
} from "@/store/api/artist/profile";
import { notify } from "@/shared/components/notification/notification";
import { useDisclosure } from "@mantine/hooks";
import { closeAllModals, openConfirmModal } from "@mantine/modals";

const urlOrEmpty = z
  .string()
  .url("Invalid URL")
  .or(z.literal(""))
  .transform((val) => (val === "" ? null : val))
  .nullable();
const profileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
  contact_email: z.string().email("Invalid email").nullable(),
  phone_number: z.string().optional().nullable(),
  website: urlOrEmpty,
  instagram: urlOrEmpty,
  twitter: urlOrEmpty,
  tiktok: urlOrEmpty,
  facebook: urlOrEmpty,
  youtube: urlOrEmpty,
  location: z.string().optional().nullable(),
  thumbnail: z.string().optional().nullable(),
});

const changeEmailSchema = z.object({
  new_email: z.string().email("Invalid email").nullable(),
  current_password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .nullable(),
});
const changePasswordSchema = z
  .object({
    current_password: z
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
  .refine((data) => data.current_password !== data.new_password, {
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
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetArtistProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateArtistProfileMutation();
  const [updateEmail, { isLoading: isUpdatingEmail }] =
    useUpdateEmailMutation();
  const [updatePassword, { isLoading: isUpdatingPassword }] =
    useChangePasswordMutation();
  const [selectedThumbnailFile, setSelectedThumbnailFile] =
    React.useState<File | null>(null);
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = React.useState<
    string | null
  >(null);
  const [
    thumbnailModalOpened,
    { open: openThumbnailModal, close: closeThumbnailModal },
  ] = useDisclosure(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: profileData || {
      first_name: "",
      last_name: "",
      bio: "",
      contact_email: "",
      phone_number: "",
      website: "",
      instagram: "",
      twitter: "",
      tiktok: "",
      facebook: "",
      youtube: "",
      location: "",
    },
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
    if (selectedThumbnailFile) {
      const objectUrl = URL.createObjectURL(selectedThumbnailFile);
      setThumbnailPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedThumbnailFile]);

  React.useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreviewUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  const onSubmit = async (data: ProfileFormValues) => {
    const formData = new FormData();

    // Prepare the profile data - only include fields that exist in the form
    const userData = {
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      bio: data.bio || "",
      contact_email: data.contact_email || null,
      phone_number: data.phone_number || null,
      location: data.location || null,
      website: data.website || null,
      instagram: data.instagram || null,
      twitter: data.twitter || null,
      tiktok: data.tiktok || null,
      facebook: data.facebook || null,
      youtube: data.youtube || null,
    };

    formData.append("profile_data", JSON.stringify(userData));

    if (selectedFile) {
      formData.append("file", selectedFile);
    }
    if (selectedThumbnailFile) {
      formData.append("thumbnail_file", selectedThumbnailFile);
    }

    try {
      await updateProfile(formData).unwrap();
      notify("Success", "Profile updated successfully");
    } catch (error) {
      notify("Error", "Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  };

  const onSubmitChangeEmail = (data: ChangeEmailFormValues) => {
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
          await updateEmail(data).unwrap();
          notify("Success", "Email updated successfully");
          closeAllModals();
        } catch (error) {
          notify("Error", "Failed to update email");
          console.error("Failed to update email:", error);
        }
      },
    });
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

  const handleCancel = () => {
    if (profileData) {
      reset(profileData);
      setPreviewUrl(profileData.profile_picture || null);
      setThumbnailPreviewUrl(profileData.thumbnail || null);
      setSelectedFile(null);
      setSelectedThumbnailFile(null);
    }
  };

  if (isLoading) return <LoadingOverlay visible />;
  if (isError) {
    return (
      <Alert
        icon={<IconAlertCircle size={18} />}
        title="Error loading profile"
        color="red"
      >
        Failed to load profile. Please try again later.
      </Alert>
    );
  }
  return (
    <Paper bg="none" className="py-6 px-32">
      <LoadingOverlay visible={isUpdating} />
      <Stack gap="lg">
        <Group>
          <Avatar
            size="lg"
            radius="xl"
            src={profileData?.profile_picture || previewUrl}
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
            <Flex gap="md" wrap="wrap" className="w-full">
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
                      onClick={() => open()}
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
              <Box className="flex-grow">
                <FileInput
                  label="Thumbnail Image"
                  placeholder="Upload thumbnail"
                  value={selectedThumbnailFile}
                  onChange={setSelectedThumbnailFile}
                  accept="image/*"
                  clearable
                  radius="md"
                  leftSection={
                    <IconPhoto
                      onClick={() => openThumbnailModal()}
                      size={20}
                      className="cursor-pointer flex-grow"
                    />
                  }
                  className="flex-grow"
                />
                <Modal
                  opened={thumbnailModalOpened}
                  onClose={closeThumbnailModal}
                >
                  {thumbnailPreviewUrl && (
                    <Image
                      radius="md"
                      src={thumbnailPreviewUrl}
                      alt="Thumbnail Preview"
                    />
                  )}
                </Modal>
              </Box>
              <TextInput
                label="Contact Email"
                type="email"
                {...register("contact_email")}
                error={errors.contact_email?.message}
                className="flex-grow"
              />
            </Flex>

            <TextInput
              label="Location"
              {...register("location")}
              error={errors.location?.message}
            />

            <Textarea
              label="Bio"
              {...register("bio")}
              error={errors.bio?.message}
              placeholder="Tell us about yourself"
              minRows={3}
            />

            <Divider
              my="sm"
              label="Contact & Social Media"
              labelPosition="center"
            />

            <TextInput
              label="Phone Number"
              leftSection={<IconPhone size={16} />}
              placeholder="+251 900 000 000"
              {...register("phone_number")}
              error={errors.phone_number?.message}
            />

            <TextInput
              label="Website"
              leftSection={<IconWorld size={16} />}
              placeholder="https://example.com"
              {...register("website")}
              error={errors.website?.message}
            />

            <Flex gap="md" wrap="wrap">
              <TextInput
                label="Instagram"
                leftSection={<IconBrandInstagram size={16} />}
                placeholder="https://www.instagram.com/username"
                {...register("instagram")}
                style={{ flex: 1 }}
                error={errors.instagram?.message}
              />
              <TextInput
                label="Facebook"
                leftSection={<IconBrandFacebook size={16} />}
                placeholder="https://www.facebook.com/username"
                {...register("facebook")}
                style={{ flex: 1 }}
                error={errors.facebook?.message}
              />
            </Flex>

            <Flex gap="md" wrap="wrap">
              <TextInput
                label="TikTok"
                leftSection={<IconBrandTiktok size={16} />}
                placeholder="https://www.tiktok.com/@username"
                {...register("tiktok")}
                style={{ flex: 1 }}
                error={errors.tiktok?.message}
              />
              <TextInput
                label="YouTube"
                leftSection={<IconBrandYoutube size={16} />}
                placeholder="https://www.youtube.com/channel/username"
                {...register("youtube")}
                style={{ flex: 1 }}
                error={errors.youtube?.message}
              />
            </Flex>

            <TextInput
              label="Twitter/X"
              leftSection={<IconX size={16} />}
              placeholder="https://x.com/username"
              {...register("twitter")}
              style={{ flex: 1 }}
              error={errors.twitter?.message}
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
                    label="New Email"
                    type="email"
                    {...registerChangeEmail("new_email")}
                    error={errorsChangeEmail.new_email?.message}
                  />
                  <TextInput
                    label="Current Password"
                    type="password"
                    {...registerChangeEmail("current_password")}
                    error={errorsChangeEmail.current_password?.message}
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
                    {...registerChangePassword("current_password")}
                    error={errorsChangePassword.current_password?.message}
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
