"use client";
import { useState } from "react";
import {
  TextInput,
  Select,
  Button,
  Group,
  Stack,
  Title,
  Card,
  SimpleGrid,
  Table,
  Badge,
  Pagination,
  Divider,
  Box,
  Paper,
  Text,
  rem,
} from "@mantine/core";
import { IconDownload, IconSearch } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  useGetOrderSummaryQuery,
  useListOrdersQuery,
} from "@/store/api/admin/admin";

export default function OrderAnalyticsPage() {
  const [page, setPage] = useState(1);
  const limit = 10;
  const skip = (page - 1) * limit;

  const form = useForm({
    defaultValues: {
      status: "",
      start_date: null,
      end_date: null,
      buyer_id: "",
      artist_id: "",
      search: "",
    },
  });

  const { data: summary } = useGetOrderSummaryQuery();
  const watched = form.watch();
  const { data: orders = [] } = useListOrdersQuery({
    ...watched,
    start_date: watched.start_date ?? undefined,
    end_date: watched.end_date ?? undefined,
    skip,
    limit,
  });

  const handleSubmit = form.handleSubmit(() => {
    setPage(1);
  });

  const statusColors = {
    PENDING: "yellow",
    COMPLETED: "green",
    CANCELLED: "red",
    SHIPPED: "blue",
  };

  return (
    <Box p="xl" maw={1920} mx="auto">
      <Stack gap="xl">
        <Box>
          <Title order={2} mb="xs">
            Order Analytics
          </Title>
          <Text c="dimmed">
            Track and manage all customer orders in one place
          </Text>
        </Box>

        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg">
          <Paper withBorder p="md" radius="md" shadow="xs">
            <Text c="dimmed" size="sm" fw={500}>
              Total Orders
            </Text>
            <Title order={3} mt={4}>
              {summary?.total_orders || 0}
            </Title>
          </Paper>
          <Paper withBorder p="md" radius="md" shadow="xs">
            <Text c="dimmed" size="sm" fw={500}>
              Revenue
            </Text>
            <Title order={3} mt={4}>
              ${summary?.total_revenue?.toLocaleString() || 0}
            </Title>
          </Paper>
          <Paper withBorder p="md" radius="md" shadow="xs">
            <Text c="dimmed" size="sm" fw={500}>
              Completed Orders
            </Text>
            <Title order={3} mt={4}>
              {summary?.completed_orders || 0}
            </Title>
          </Paper>
        </SimpleGrid>

        <Paper withBorder p="lg" radius="md" shadow="xs">
          <form onSubmit={handleSubmit}>
            <Stack gap="md">
              <Group grow align="flex-end">
                <Select
                  label="Status"
                  data={["PENDING", "COMPLETED", "CANCELLED", "SHIPPED"]}
                  value={form.watch("status")}
                  onChange={(value) => form.setValue("status", value || "")}
                  clearable
                  placeholder="Filter by status"
                />
                <TextInput
                  label="Search"
                  placeholder="Search orders..."
                  leftSection={<IconSearch size={16} />}
                  {...form.register("search")}
                />
              </Group>
              <Group justify="space-between">
                <Button type="submit" radius="md">
                  Apply Filters
                </Button>
                <Button
                  variant="light"
                  radius="md"
                  leftSection={<IconDownload size={16} />}
                  component="a"
                  href="/api/orders/export"
                >
                  Export CSV
                </Button>
              </Group>
            </Stack>
          </form>
        </Paper>

        <Paper withBorder radius="md" shadow="xs">
          <Box p="md">
            <Title order={4} mb="sm">
              Recent Orders
            </Title>
            <Divider mb="md" />
            <Table.ScrollContainer minWidth={800}>
              <Table verticalSpacing="sm" highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Buyer</Table.Th>
                    <Table.Th>Amount</Table.Th>
                    <Table.Th>Status</Table.Th>
                    <Table.Th>Date</Table.Th>
                    <Table.Th>Action</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {orders.map((order) => (
                    <Table.Tr key={order.id}>
                      <Table.Td>{order.buyer?.username || "Unknown"}</Table.Td>
                      <Table.Td>
                        ETB {order.total_amount.toLocaleString()}
                      </Table.Td>
                      <Table.Td>
                        <Badge
                          variant="light"
                          color={statusColors[order.status] || "gray"}
                        >
                          {order.status}
                        </Badge>
                      </Table.Td>
                      <Table.Td>
                        {new Date(order.created_at).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Table.Td>
                      <Table.Td>
                        <Button
                          variant="subtle"
                          size="xs"
                          component="a"
                          href={`/admin/dashboard/orders/${order.id}`}
                        >
                          View Details
                        </Button>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Box>
          <Divider />
          <Group justify="flex-end" p="md">
            <Pagination
              total={Math.ceil((summary?.total_orders || 0) / limit)}
              value={page}
              onChange={setPage}
              radius="md"
            />
          </Group>
        </Paper>
      </Stack>
    </Box>
  );
}
