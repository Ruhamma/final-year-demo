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
} from "@mantine/core";
import { IconDownload } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import {
  useGetOrderSummaryQuery,
  useListOrdersQuery,
} from "@/store/api/admin/admin";

export default function OrderAnalyticsPage() {
  const [page, setPage] = useState(1);
  const limit = 20;
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

  return (
    <Stack p="xl" gap="lg">
      <Title order={2}>Order Analytics</Title>

      {/* Summary Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, lg: 3 }} spacing="lg">
        <Card shadow="sm" radius="md" withBorder>
          <Title order={5} c="dimmed">
            Total Orders
          </Title>
          <Title order={3}>{summary?.total_orders || 0}</Title>
        </Card>
        <Card shadow="sm" radius="md" withBorder>
          <Title order={5} c="dimmed">
            Revenue
          </Title>
          <Title order={3}>${summary?.total_revenue || 0}</Title>
        </Card>
        <Card shadow="sm" radius="md" withBorder>
          <Title order={5} c="dimmed">
            Completed Orders
          </Title>
          <Title order={3}>{summary?.completed_orders || 0}</Title>
        </Card>
      </SimpleGrid>

      {/* Filters */}
      <Card withBorder shadow="xs" radius="md" p="lg">
        <form onSubmit={handleSubmit}>
          <Group grow align="end" mb="md">
            <Select
              label="Status"
              data={["PENDING", "COMPLETED", "CANCELLED", "SHIPPED"]}
              value={form.watch("status")}
              onChange={(value) => form.setValue("status", value || "")}
              clearable
            />
            <TextInput
              label="Search"
              placeholder="Artwork name, buyer, etc."
              {...form.register("search")}
            />
          </Group>
          <Group justify="space-between" mt="sm">
            <Button type="submit">Apply Filters</Button>
            <Button
              component="a"
              href="/api/orders/export"
              variant="light"
              leftSection={<IconDownload size={16} />}
            >
              Export CSV
            </Button>
          </Group>
        </form>
      </Card>

      {/* Orders Table */}
      <Box>
        <Title order={4} mb="xs">
          Orders
        </Title>
        <Table highlightOnHover withTableBorder verticalSpacing="sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>Buyer</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: any) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.buyer?.username || "Unknown"}</td>
                <td>${order.total_amount}</td>
                <td>
                  <Badge variant="light">{order.status}</Badge>
                </td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>
                  <Button
                    variant="light"
                    size="xs"
                    component="a"
                    href={`/admin/dashboard/orders/${order.id}`}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Box>

      {/* Pagination */}
      <Group justify="center" mt="md">
        <Pagination
          total={Math.ceil((summary?.total_orders || 0) / limit)}
          value={page}
          onChange={setPage}
        />
      </Group>
    </Stack>
  );
}
