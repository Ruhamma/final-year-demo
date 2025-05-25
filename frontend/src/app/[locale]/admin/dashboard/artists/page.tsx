"use client";
import {
  Table,
  Button,
  Group,
  Modal,
  Text,
  Badge,
  Skeleton,
  Stack,
  Loader,
  Avatar,
  TextInput,
  Pagination,
  Select,
  Box,
  ActionIcon,
  Flex,
  Divider,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
  useListArtistsQuery,
  useDeactivateArtistMutation,
  useGetArtistQuery,
  useVerifyArtistMutation,
} from "@/store/api/admin/admin";

import React, { useState } from "react";
import {
  IconSearch,
  IconX,
  IconUser,
  IconFilter,
  IconPhone,
  IconStatusChange,
  IconMail,
  IconListDetails,
  IconUsersGroup,
  IconInfoCircle,
  IconMapPin,
  IconUserCheck,
} from "@tabler/icons-react";
import { useDebouncedValue } from "@mantine/hooks";
import { notify } from "@/shared/components/notification/notification";

export default function UserManagement() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 300);
  const [statusFilter, setStatusFilter] = useState<string | null>();

  const [opened, { open, close }] = useDisclosure(false);
  const [selectedArtistId, setSelectedArtistId] = React.useState<string | null>(
    null
  );

  const { data, isLoading, isError } = useListArtistsQuery({
    offset: skip,
    limit,
    is_active:
      statusFilter === "true"
        ? true
        : statusFilter === "false"
        ? false
        : undefined,
    search: debouncedSearch,
  });

  const { data: artistDetails } = useGetArtistQuery(selectedArtistId || "", {
    skip: !selectedArtistId,
  });

  const [deactivateArtist] = useDeactivateArtistMutation();
  const [verifyArtist] = useVerifyArtistMutation();

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleViewArtist = (artistId: string) => {
    setSelectedArtistId(artistId);
    open();
  };

  const handleDeactivate = async (artistId: string) => {
    try {
      await deactivateArtist(artistId).unwrap();
      notify("Success", "Artist deactivated successfully");
    } catch {
      notify("Error", "Failed to deactivate artist");
    }
  };

  const handleVerify = async (artistId: string) => {
    try {
      await verifyArtist(artistId).unwrap();
      notify("Success", "Artist verified successfully");
    } catch {
      notify("Error", "Failed to verify artist");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter(null);
  };

  if (isLoading) return <Loader size="xl" variant="dots" />;
  if (isError) return <Text c="red">Error loading artists</Text>;

  const rows = data?.artists?.map((artist: any) => (
    <Table.Tr key={artist.id}>
      <Table.Td>
        <Flex align="center" gap="sm">
          <Avatar
            src={artist.profile_picture}
            alt={artist.user.username}
            radius="xl"
            size="md"
          >
            <IconUser size={18} />
          </Avatar>
          <Text>{artist.user.username || artist.user.email.split("@")[0]}</Text>
        </Flex>
      </Table.Td>
      <Table.Td>{artist.user.email}</Table.Td>
      <Table.Td>
        <Badge color={artist.is_verified ? "blue" : "gray"} variant="light">
          {artist.is_verified ? "Verified" : "Not Verified"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Badge color={artist.is_active ? "green" : "red"} variant="light">
          {artist.is_active ? "Active" : "Inactive"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleViewArtist(artist.id)}
          >
            View
          </Button>
          <Button
            variant="light"
            color={artist.is_active ? "red" : "green"}
            size="xs"
            onClick={() => handleDeactivate(artist.id)}
          >
            {artist.is_active ? "Deactivate" : "Activate"}
          </Button>
          <Button
            variant="light"
            color={artist.is_verified ? "gray" : "blue"}
            size="xs"
            onClick={() => handleVerify(artist.id)}
          >
            {artist.is_verified ? "Remove verification " : "Verify"}
          </Button>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Box className="w-full p-10 ">
      <Box mb="xl">
        <Group align="center" gap="sm" mb="xs">
          <ThemeIcon variant="light" color="blue" size="lg" radius="xl">
            <IconUsersGroup size={20} />
          </ThemeIcon>
          <Title order={2} size="xl">
            Artist Management
          </Title>
        </Group>

        <Text c="dimmed" size="sm" mb="md">
          Manage artists, view details, and deactivate accounts as necessary.
        </Text>

        <Divider my="sm" />
      </Box>
      <Group grow gap="md" align="flex-end" className="mb-10">
        <TextInput
          placeholder="Search buyers..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          rightSection={
            search && (
              <ActionIcon onClick={() => setSearch("")}>
                <IconX size={16} />
              </ActionIcon>
            )
          }
        />
        <Select
          placeholder="Filter by status"
          data={[
            { value: "true", label: "Active" },
            { value: "false", label: "Inactive" },
          ]}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
          leftSection={<IconFilter size={16} />}
        />
        {(search || statusFilter) && (
          <Button variant="subtle" onClick={clearFilters} size="sm">
            Clear filters
          </Button>
        )}
      </Group>
      <Group align="center" gap="xs" mb="xs">
        <ThemeIcon variant="light" color="gray" size="md" radius="xl">
          <IconListDetails size={18} />
        </ThemeIcon>
        <Text size="lg" fw={600}>
          Artists List
        </Text>
      </Group>

      <Flex justify="space-between" align="center">
        <Text c="dimmed" size="sm">
          Total Artists: <strong>{data?.total}</strong>
        </Text>
      </Flex>

      <Divider my="sm" />
      <Box style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Artist</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Verify</Table.Th>
              <Table.Th>Status</Table.Th>
              <Table.Th>Actions</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>

      {totalPages > 1 && (
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          siblings={1}
          boundaries={1}
          mt="md"
        />
      )}

      <Modal opened={opened} onClose={close} title="Artist Details" size="md">
        {artistDetails ? (
          <Stack gap="sm">
            <Flex align="center" gap="md">
              <Avatar
                src={artistDetails.profile_picture}
                alt={artistDetails.user.username || "Artist"}
                size="lg"
                radius="xl"
                color="blue"
              >
                <IconUser size={24} />
              </Avatar>
              <div>
                <Text size="lg" fw={600}>
                  {artistDetails.user.username || "No username"}
                </Text>
                <Flex align="center" gap="xs">
                  <IconMail size={16} />
                  <Text c="dimmed" size="sm">
                    {artistDetails.contact_email || artistDetails.user.email}
                  </Text>
                </Flex>
              </div>
            </Flex>

            <Divider my="sm" />

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconStatusChange size={18} />
                <Text fw={500}>Status:</Text>
              </Flex>
              <Badge color={artistDetails.is_active ? "green" : "red"}>
                {artistDetails.is_active ? "Active" : "Inactive"}
              </Badge>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconUserCheck size={18} />
                <Text fw={500}>Verification:</Text>
              </Flex>
              <Badge color={artistDetails.is_verified ? "blue" : "gray"}>
                {artistDetails.is_verified ? "Verified" : "Not Verified"}
              </Badge>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconPhone size={18} />
                <Text fw={500}>Phone:</Text>
              </Flex>
              <Text>{artistDetails.phone_number || "Not provided"}</Text>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconMapPin size={18} />
                <Text fw={500}>Location:</Text>
              </Flex>
              <Text>{artistDetails.location || "Not provided"}</Text>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconInfoCircle size={18} />
                <Text fw={500}>Bio:</Text>
              </Flex>
              <Text lineClamp={3} w="60%">
                {artistDetails.bio || "No bio provided"}
              </Text>
            </Group>

            <Divider my="sm" />

            <Stack gap={4}>
              <Text fw={500}>Social Links:</Text>
              {[
                { label: "Website", value: artistDetails.website },
                { label: "Instagram", value: artistDetails.instagram },
                { label: "TikTok", value: artistDetails.tiktok },
                { label: "Facebook", value: artistDetails.facebook },
                { label: "Twitter", value: artistDetails.twitter },
                { label: "YouTube", value: artistDetails.youtube },
              ]
                .filter((link) => link.value)
                .map((link) => (
                  <Flex key={link.label} justify="space-between">
                    <Text>{link.label}:</Text>
                    <a
                      href={link.value!}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Text c="blue" td="underline">
                        {link.value}
                      </Text>
                    </a>
                  </Flex>
                ))}
              {[
                artistDetails.website,
                artistDetails.instagram,
                artistDetails.tiktok,
                artistDetails.facebook,
                artistDetails.twitter,
                artistDetails.youtube,
              ].every((v) => !v) && (
                <Text c="dimmed">No social links provided</Text>
              )}
            </Stack>
          </Stack>
        ) : (
          <Skeleton height={200} />
        )}
      </Modal>
    </Box>
  );
}
