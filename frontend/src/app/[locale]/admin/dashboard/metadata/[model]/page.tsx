"use client";

import {
  Tabs,
  Card,
  Button,
  TextInput,
  Textarea,
  Group,
  Text,
  Center,
  Loader,
  Table,
  ActionIcon,
  Modal,
  Title,
  Container,
  Pagination,
  Badge,
  ScrollArea,
  Paper,
  rem,
  Skeleton,
  Flex,
  Box,
  Divider,
  Tooltip,
} from "@mantine/core";
import { useState } from "react";
import {
  IconPlus,
  IconEdit,
  IconTrash,
  IconDownload,
  IconSearch,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  useListMetadataQuery,
  useCreateMetadataMutation,
  useUpdateMetadataMutation,
  useDeleteMetadataMutation,
  useGetMetadataUsageCountsQuery,
  useExportMetadataUsageCSVMutation,
} from "@/store/api/admin/admin";
import { useParams } from "next/navigation";
import { notifications } from "@mantine/notifications";

export default function MetadataManagementPage() {
  const { model } = useParams();
  const model_name = model?.toString();
  const [activeTab, setActiveTab] = useState<string | null>("view");
  const [search, setSearch] = useState("");
  const [editEntry, setEditEntry] = useState<any | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const limit = 10;

  // Data fetching
  const { data, isLoading } = useListMetadataQuery({
    model_name: model_name ?? "",
    search,
    skip: (page - 1) * limit,
    limit,
  });
  const entries = data?.results || [];
  const totalPages = Math.ceil((data?.total || 0) / limit);
  const { data: usageData = [] } = useGetMetadataUsageCountsQuery(
    model_name ?? ""
  );

  // Mutations
  const [createMetadata, { isLoading: isCreating }] =
    useCreateMetadataMutation();
  const [updateMetadata, { isLoading: isUpdating }] =
    useUpdateMetadataMutation();
  const [deleteMetadata, { isLoading: isDeleting }] =
    useDeleteMetadataMutation();
  const [exportCSV, { isLoading: isExporting }] =
    useExportMetadataUsageCSVMutation();

  // Form handling
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    mode: "onBlur",
  });

  const handleExportCSV = async () => {
    if (!model_name) return;

    try {
      const blob = await exportCSV(model_name).unwrap();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${model_name}_usage_counts.csv`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      notifications.show({
        title: "Export successful",
        message: "Your data has been downloaded",
      });
    } catch (error) {
      notifications.show({
        title: "Export failed",
        message: "Could not download data",
        color: "red",
      });
    }
  };

  const handleSubmit = async (values: any) => {
    try {
      if (editEntry) {
        await updateMetadata({
          model_name: model_name ?? "",
          entry_id: editEntry.id,
          data: values,
        }).unwrap();
        notifications.show({
          title: "Success",
          message: "Entry updated successfully",
        });
      } else {
        await createMetadata({
          model_name: model_name ?? "",
          data: values,
        }).unwrap();
        notifications.show({
          title: "Success",
          message: "New entry created",
        });
      }
      setEditEntry(null);
      form.reset();
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Operation failed",
        color: "red",
      });
    }
  };

  const confirmDelete = async () => {
    if (!model_name || !deleteTarget) return;
    try {
      await deleteMetadata({
        model_name,
        entry_id: deleteTarget,
      }).unwrap();
      notifications.show({
        title: "Success",
        message: "Entry deleted",
      });
    } catch (error) {
      notifications.show({
        title: "Error",
        message: "Failed to delete",
        color: "red",
      });
    } finally {
      setDeleteTarget(null);
    }
  };
  const handleEdit = (entry: any) => {
    setEditEntry(entry);
    form.reset({
      name: entry.name,
      description: entry.description || "",
    });
  };
  return (
    <Container size="lg" py="xl" px={{ base: "sm", sm: "xl" }}>
      <Flex direction="column" gap="md">
        <Title order={2} ta="center" mb="sm" c="dark.4">
          {model_name
            ? model_name.charAt(0).toUpperCase() + model_name.slice(1)
            : ""}{" "}
          Management
        </Title>
        <Text ta="center" c="dimmed" mb="sm">
          Manage your {model_name} entries, including creating, editing, and
          deleting them. You can also view usage statistics.
        </Text>
        <Divider mb="sm" />

        <Paper withBorder radius="md" shadow="sm" p="md">
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List grow>
              <Tabs.Tab value="view" leftSection={<IconSearch size={16} />}>
                Browse
              </Tabs.Tab>
              <Tabs.Tab value="create" leftSection={<IconPlus size={16} />}>
                Create
              </Tabs.Tab>
              <Tabs.Tab
                value="usage"
                leftSection={<IconInfoCircle size={16} />}
              >
                Analytics
              </Tabs.Tab>
            </Tabs.List>

            <Divider my="md" />

            {/* View Tab */}
            <Tabs.Panel value="view" pt="sm">
              <Flex justify="space-between" align="center" mb="md">
                <TextInput
                  placeholder="Search entries..."
                  leftSection={<IconSearch size={16} />}
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  w={{ base: "100%", sm: 400 }}
                />
                <Button
                  variant="light"
                  onClick={() => setActiveTab("create")}
                  leftSection={<IconPlus size={16} />}
                  visibleFrom="sm"
                >
                  New Entry
                </Button>
              </Flex>

              {isLoading ? (
                <Table verticalSpacing="sm">
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Name</Table.Th>
                      <Table.Th>Description</Table.Th>
                      <Table.Th>Actions</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>
                    {[...Array(5)].map((_, i) => (
                      <Table.Tr key={i}>
                        <Table.Td>
                          <Skeleton height={24} />
                        </Table.Td>
                        <Table.Td>
                          <Skeleton height={24} width="80%" />
                        </Table.Td>
                        <Table.Td>
                          <Group gap={4}>
                            <Skeleton circle height={32} width={32} />
                            <Skeleton circle height={32} width={32} />
                          </Group>
                        </Table.Td>
                      </Table.Tr>
                    ))}
                  </Table.Tbody>
                </Table>
              ) : entries.length > 0 ? (
                <ScrollArea>
                  <Table verticalSpacing="sm" highlightOnHover>
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Description</Table.Th>
                        <Table.Th w={120}>Actions</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {entries.map((entry: any) => (
                        <Table.Tr key={entry.id}>
                          <Table.Td>
                            <Text fw={500}>{entry.name}</Text>
                          </Table.Td>
                          <Table.Td>
                            <Text lineClamp={1} c="dimmed">
                              {entry.description || "No description"}
                            </Text>
                          </Table.Td>
                          <Table.Td>
                            <Group gap={4} wrap="nowrap">
                              <Tooltip label="Edit">
                                <ActionIcon
                                  variant="subtle"
                                  color="green"
                                  onClick={() => handleEdit(entry)}
                                >
                                  <IconEdit size={18} />
                                </ActionIcon>
                              </Tooltip>
                              <Tooltip label="Delete">
                                <ActionIcon
                                  variant="subtle"
                                  color="red"
                                  onClick={() => setDeleteTarget(entry.id)}
                                >
                                  <IconTrash size={18} />
                                </ActionIcon>
                              </Tooltip>
                            </Group>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              ) : (
                <Center py="xl">
                  <Box ta="center">
                    <Text size="lg" fw={500} mb="sm">
                      No entries found
                    </Text>
                    <Text c="dimmed" mb="md">
                      {search
                        ? "Try a different search"
                        : "Get started by creating a new entry"}
                    </Text>
                    <Button
                      onClick={() => setActiveTab("create")}
                      leftSection={<IconPlus size={16} />}
                    >
                      Create Entry
                    </Button>
                  </Box>
                </Center>
              )}

              {totalPages > 1 && (
                <Center mt="xl">
                  <Pagination
                    value={page}
                    onChange={setPage}
                    total={totalPages}
                    withEdges
                  />
                </Center>
              )}
            </Tabs.Panel>

            {/* Create/Edit Tab */}
            <Tabs.Panel value="create" pt="sm">
              <Box miw={900} mx="auto">
                <Title order={3} mb="xl">
                  {editEntry ? "Edit Entry" : "Create New Entry"}
                </Title>

                <form onSubmit={form.handleSubmit(handleSubmit)}>
                  <TextInput
                    label="Name"
                    placeholder="Enter name"
                    withAsterisk
                    mb="md"
                    {...form.register("name", { required: true })}
                  />

                  <Textarea
                    label="Description"
                    placeholder="Enter description"
                    autosize
                    minRows={3}
                    mb="xl"
                    {...form.register("description")}
                  />

                  <Group justify="flex-end">
                    <Button
                      variant="default"
                      onClick={() => {
                        setEditEntry(null);
                        form.reset();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      loading={isCreating || isUpdating}
                      color="green"
                    >
                      {editEntry ? "Save Changes" : "Create Entry"}
                    </Button>
                  </Group>
                </form>
              </Box>
            </Tabs.Panel>

            {/* Usage Stats Tab */}
            <Tabs.Panel value="usage" pt="sm">
              <Card withBorder radius="md" p={0} miw={900} mx="auto">
                <Box p="md" bg="green.0">
                  <Flex justify="space-between" align="center">
                    <Title order={4}>Usage Statistics</Title>
                    <Button
                      variant="light"
                      color="green"
                      leftSection={<IconDownload size={18} />}
                      onClick={handleExportCSV}
                      loading={isExporting}
                    >
                      Export Data
                    </Button>
                  </Flex>
                </Box>

                <ScrollArea h={{ base: 400, sm: 500 }} p="md">
                  <Table verticalSpacing="sm">
                    <Table.Thead>
                      <Table.Tr>
                        <Table.Th>Name</Table.Th>
                        <Table.Th ta="right">Usage Count</Table.Th>
                      </Table.Tr>
                    </Table.Thead>
                    <Table.Tbody>
                      {usageData.map((item: any) => (
                        <Table.Tr key={item.name}>
                          <Table.Td>{item.name}</Table.Td>
                          <Table.Td ta="right">
                            <Badge variant="light" color="green">
                              {item.count}
                            </Badge>
                          </Table.Td>
                        </Table.Tr>
                      ))}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Card>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </Flex>

      <Modal
        opened={!!editEntry}
        onClose={() => setEditEntry(null)}
        title={`Edit ${editEntry?.name}`}
        centered
        size="lg"
      >
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <TextInput
            label="Name"
            placeholder="Enter name"
            withAsterisk
            mb="md"
            {...form.register("name", { required: true })}
          />
          <Textarea
            label="Description"
            placeholder="Enter description"
            autosize
            minRows={3}
            mb="xl"
            {...form.register("description")}
          />
          <Group justify="flex-end">
            <Button variant="default" onClick={() => setEditEntry(null)}>
              Cancel
            </Button>
            <Button type="submit" color="green">
              Save Changes
            </Button>
          </Group>
        </form>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        opened={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        title="Confirm Deletion"
        centered
      >
        <Text mb="xl">
          Are you sure you want to delete this entry? This action cannot be
          undone.
        </Text>
        <Group justify="flex-end">
          <Button variant="default" onClick={() => setDeleteTarget(null)}>
            Cancel
          </Button>
          <Button color="red" onClick={confirmDelete} loading={isDeleting}>
            Delete
          </Button>
        </Group>
      </Modal>
    </Container>
  );
}
