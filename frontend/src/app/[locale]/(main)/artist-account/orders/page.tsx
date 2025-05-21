"use client";

import {
  Table,
  Text,
  Loader,
  Badge,
  Collapse,
  Center,
  Group,
  Button,
  Box,
  Stack,
  Divider,
  Card,
  SimpleGrid,
  Select,
  TextInput,
  Pagination,
} from "@mantine/core";
import { useState, Fragment } from "react";
import {
  IconShoppingBag,
  IconPackage,
  IconCheck,
  IconTruckDelivery,
  IconX,
  IconClock,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useGetArtistOrdersQuery } from "@/store/api/order/order";

const statusColors = {
  PENDING: "green",
  PROCESSING: "blue",
  SHIPPED: "orange",
  COMPLETED: "green",
  CANCELLED: "red",
};

const statusIcons = {
  PENDING: IconClock,
  PROCESSING: IconPackage,
  SHIPPED: IconTruckDelivery,
  COMPLETED: IconCheck,
  CANCELLED: IconX,
};

const allStatuses = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
];

const OrderSummaryCards = ({ orders }) => {
  const statusCounts = allStatuses.reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});

  orders.forEach((order) => {
    if (statusCounts.hasOwnProperty(order.status)) {
      statusCounts[order.status]++;
    }
  });

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 5 }} mb="md">
      {allStatuses.map((status) => {
        const Icon = statusIcons[status];
        return (
          <Card shadow="sm" p="md" radius="md" withBorder key={status}>
            <Group>
              <Icon size={24} color={statusColors[status]} />
              <Stack gap={0}>
                <Text size="sm" c="dimmed">
                  {status}
                </Text>
                <Text fw={600}>{statusCounts[status]} orders</Text>
              </Stack>
            </Group>
          </Card>
        );
      })}
    </SimpleGrid>
  );
};

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const { data, isLoading } = useGetArtistOrdersQuery({});
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [paymentFilter, setPaymentFilter] = useState<string | null>(null);

  const filteredOrders = data?.orders?.filter((order) => {
    const matchesStatus = !statusFilter || order.status === statusFilter;
    const matchesPayment =
      !paymentFilter || order.payment_method === paymentFilter;
    const matchesSearch =
      !search || order.id.slice(0, 8).includes(search.toLowerCase());
    return matchesStatus && matchesPayment && matchesSearch;
  });

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  return (
    <Box p="sm" maw="1100px" mx="auto">
      <Group mb="md">
        <IconShoppingBag size={24} stroke={1.5} />
        <Text size="xl" fw={700}>
          Orders Received
        </Text>
      </Group>
      <Text size="sm" c="dimmed" mb="sm">
        View and manage orders made by users for your artworks.
      </Text>
      <Divider mb="md" />

      <OrderSummaryCards orders={data?.orders} />

      <Group mb="sm" grow className="mt-6 mb-8">
        <TextInput
          placeholder="Search by order id..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
        <Select
          placeholder="Filter by status"
          data={["PENDING", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED"]}
          value={statusFilter}
          onChange={setStatusFilter}
          clearable
        />
        <Select
          placeholder="Filter by payment method"
          data={[
            { value: "chapa", label: "Chapa" },
            { value: "cash_on_delivery", label: "Cash on delivery" },
          ]}
          onChange={setPaymentFilter}
          clearable
        />
      </Group>

      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        verticalSpacing="md"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Order ID</Table.Th>
            <Table.Th>Date</Table.Th>
            <Table.Th>Payment method</Table.Th>
            <Table.Th>Total</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {filteredOrders?.map((order) => (
            <Fragment key={order.id}>
              <Table.Tr>
                <Table.Td>{order.id.slice(0, 8)}</Table.Td>
                <Table.Td>
                  {new Date(order.created_at).toLocaleDateString()}
                </Table.Td>
                <Table.Td>
                  {order.payment_method === "chapa"
                    ? "Chapa"
                    : "Cash on delivery"}
                </Table.Td>
                <Table.Td>ETB {order.total_amount.toFixed(2)}</Table.Td>
                <Table.Td>
                  <Badge color={statusColors[order.status]}>
                    {order.status}
                  </Badge>
                </Table.Td>
                <Table.Td>
                  <Button
                    size="xs"
                    variant="light"
                    onClick={() => router.push(`orders/${order.id}`)}
                  >
                    View
                  </Button>
                </Table.Td>
              </Table.Tr>
            </Fragment>
          ))}
        </Table.Tbody>
      </Table>
      <Center className="mt-10">
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          siblings={1}
          boundaries={1}
        />
      </Center>
    </Box>
  );
};

export default Page;
