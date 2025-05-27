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
  useListUsersQuery,
  useDeactivateUserMutation,
  useGetUserQuery,
} from "@/store/api/admin/admin";
import React, { useState } from "react";
import {
  IconSearch,
  IconX,
  IconUser,
  IconFilter,
  IconCalendar,
  IconPhone,
  IconStatusChange,
  IconUserShield,
  IconMail,
  IconListDetails,
  IconUsersGroup,
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
  const [selectedUserId, setSelectedUserId] = React.useState<string | null>(
    null
  );
  const [deactivateUser, { isLoading: isActivating }] =
    useDeactivateUserMutation();

  const { data, isLoading, isError } = useListUsersQuery({
    skip,
    limit,
    search: debouncedSearch,
    is_active:
      statusFilter === "true"
        ? true
        : statusFilter === "false"
        ? false
        : undefined,
  });

  const { data: userDetails } = useGetUserQuery(selectedUserId || "", {
    skip: !selectedUserId,
  });

  const totalPages = Math.ceil((data?.total || 0) / limit);

  const handleViewUser = (userId: string) => {
    setSelectedUserId(userId);
    open();
  };

  const handleDeactivate = async (userId: string) => {
    try {
      await deactivateUser(userId).unwrap();
      notify("Success", "User deactivated successfully");
    } catch (error) {
      console.error("Failed to deactivate user:", error);
      notify("Error", "Error something went wrong");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setStatusFilter(null);
  };

  if (isLoading) return <Loader size="xl" variant="dots" />;
  if (isError) return <Text c="red">Error loading users</Text>;

  const rows = data?.users?.map((user: any) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Flex align="center" gap="sm">
          <Avatar
            src={user.profile_picture}
            alt={user.username}
            radius="xl"
            size="md"
          >
            <IconUser size={18} />
          </Avatar>
          <Text>{user.username || user.email.split("@")[0]}</Text>
        </Flex>
      </Table.Td>
      <Table.Td>{user.email}</Table.Td>
      <Table.Td>
        <Badge color={user.is_active ? "green" : "red"} variant="light">
          {user.is_active ? "Active" : "Inactive"}
        </Badge>
      </Table.Td>
      <Table.Td>
        <Group gap="xs">
          <Button
            variant="outline"
            size="xs"
            onClick={() => handleViewUser(user.id)}
          >
            View
          </Button>
          <Button
            variant="light"
            color={user.is_active ? "red" : "green"}
            size="xs"
            onClick={() => handleDeactivate(user.id)}
          >
            {user.is_active ? "Deactivate" : "Activate"}
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
            User Management
          </Title>
        </Group>

        <Text c="dimmed" size="sm" mb="md">
          Manage users, view details, and deactivate accounts as necessary.
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
          Users List
        </Text>
      </Group>

      <Flex justify="space-between" align="center">
        <Text c="dimmed" size="sm">
          Total Users: <strong>{data?.total}</strong>
        </Text>
      </Flex>

      <Divider my="sm" />
      <Box style={{ overflowX: "auto" }}>
        <Table striped highlightOnHover verticalSpacing="sm">
          <Table.Thead>
            <Table.Tr>
              <Table.Th>User</Table.Th>
              <Table.Th>Email</Table.Th>
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

      <Modal opened={opened} onClose={close} title="User Details" size="md">
        {userDetails ? (
          <Stack gap="sm">
            <Flex align="center" gap="md">
              <Avatar
                src={userDetails.profile_picture}
                alt={userDetails.username}
                size="lg"
                radius="xl"
                color="blue"
              >
                <IconUser size={24} />
              </Avatar>
              <div>
                <Text size="lg" fw={600}>
                  {userDetails.username || "No username"}
                </Text>
                <Flex align="center" gap="xs">
                  <IconMail size={16} />
                  <Text c="dimmed" size="sm">
                    {userDetails.email}
                  </Text>
                </Flex>
              </div>
            </Flex>

            <Divider my="sm" />

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconUserShield size={18} />
                <Text fw={500}>Role:</Text>
              </Flex>
              <Badge variant="light" color="blue">
                {userDetails.role?.name || "No role"}
              </Badge>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconStatusChange size={18} />
                <Text fw={500}>Status:</Text>
              </Flex>
              <Badge color={userDetails.is_active ? "green" : "red"}>
                {userDetails.is_active ? "Active" : "Inactive"}
              </Badge>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconPhone size={18} />
                <Text fw={500}>Phone:</Text>
              </Flex>
              <Text>{userDetails.phone_number || "Not provided"}</Text>
            </Group>

            <Group justify="space-between">
              <Flex align="center" gap="xs">
                <IconCalendar size={18} />
                <Text fw={500}>Joined:</Text>
              </Flex>
              <Text>
                {new Date(userDetails.created_at).toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  }
                )}
              </Text>
            </Group>
          </Stack>
        ) : (
          <Skeleton height={200} />
        )}
      </Modal>
    </Box>
  );
}
