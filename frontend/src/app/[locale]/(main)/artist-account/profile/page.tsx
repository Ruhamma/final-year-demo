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
} from "@tabler/icons-react";
import { useAuth } from "@/context/useAuth";
import {
  useGetArtistProfileQuery,
  useUpdateArtistProfileMutation,
} from "@/store/api/artist/profile";
import { notify } from "@/shared/components/notification/notification";

const profileSchema = z.object({
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  bio: z.string().max(200, "Bio must be 200 characters or less").optional(),
  contact_email: z.string().email("Invalid email").nullable(),
  phone_number: z.string().optional().nullable(),
  website: z.string().url("Invalid URL").or(z.literal("")).optional().nullable(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
  tiktok: z.string().optional(),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  location: z.string().optional().nullable(),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

const ProfileForm = () => {
  const { user } = useAuth();
  const {
    data: profileData,
    isLoading,
    isError,
  } = useGetArtistProfileQuery({});
  const [updateProfile, { isLoading: isUpdating }] =
    useUpdateArtistProfileMutation();

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

  // Reset form when profile data loads
  React.useEffect(() => {
    if (profileData) {
      reset(profileData);
    }
  }, [profileData, reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      await updateProfile(data).unwrap();
      notify("Success", 'Profile updated successfully');
    } catch (error) {
      notify("Error", "Failed to update profile");
      console.error("Failed to update profile:", error);
    }
  };

  const handleCancel = () => {
    if (profileData) {
      reset(profileData);
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
    <Paper p="xl" bg="none" >
      <LoadingOverlay visible={isUpdating} />
      <Stack gap="lg">
        <Group>
          <Avatar size="lg" radius="xl" src={profileData?.profile_picture} />
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
          <Flex gap="md" wrap="wrap">
            <TextInput
              label="First Name"
              {...register("first_name")}
              error={errors.first_name?.message}
            />
             <TextInput
              label="Last Name"
              {...register("first_name")}
              error={errors.last_name?.message}
            />
</Flex>
            <TextInput
              label="Email"
              type="email"
              {...register("contact_email")}
              error={errors.contact_email?.message}
              required
            />

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
                placeholder="@username"
                {...register("instagram")}
                style={{ flex: 1 }}
              />
              <TextInput
                label="Facebook"
                leftSection={<IconBrandFacebook size={16} />}
                placeholder="username"
                {...register("facebook")}
                style={{ flex: 1 }}
              />
            </Flex>

            <Flex gap="md" wrap="wrap">
              <TextInput
                label="TikTok"
                leftSection={<IconBrandTiktok size={16} />}
                placeholder="@username"
                {...register("tiktok")}
                style={{ flex: 1 }}
              />
              <TextInput
                label="YouTube"
                leftSection={<IconBrandYoutube size={16} />}
                placeholder="channel name"
                {...register("youtube")}
                style={{ flex: 1 }}
              />
            </Flex>

            <TextInput
              label="Twitter/X"
              leftSection={<IconX size={16} />}
              placeholder="@username"
              {...register("twitter")}
              style={{ flex: 1 }}
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
      </Stack>
    </Paper>
  );
};

export default ProfileForm;
