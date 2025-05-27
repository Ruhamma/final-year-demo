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
  Pagination,
} from "@mantine/core";
import { useGetUserOrdersQuery } from "@/store/api/order/order";
import {
  IconChevronDown,
  IconChevronUp,
  IconPackageOff,
  IconShoppingBag,
} from "@tabler/icons-react";
import { useState, Fragment } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const { data, isLoading } = useGetUserOrdersQuery({
    skip,
    limit,
  });
  const [openedOrderId, setOpenedOrderId] = useState<string | null>(null);

  const toggleRow = (id: string) => {
    setOpenedOrderId((prev) => (prev === id ? null : id));
  };

  if (isLoading) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);
  if (!data || data.total === 0) {
    return (
      <Center h="100vh">
        <Stack align="center" gap="xs">
          <IconPackageOff size={48} stroke={1.5} color="gray" />
          <Text size="lg" c="dimmed">
            No orders found.
          </Text>
        </Stack>
      </Center>
    );
  }

  return (
    <Box p="sm" maw="1000px" mx="auto">
      <Group mb="md">
        <IconShoppingBag size={24} stroke={1.5} />
        <Text size="xl" fw={700}>
          Your Orders
        </Text>
      </Group>
      <Text size="sm" c="dimmed" mb="sm">
        Here you can view and manage all your past orders.
      </Text>
      <Divider mb="md" />

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
            <Table.Th>Total</Table.Th>
            <Table.Th>Payment</Table.Th>
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {data &&
            data?.orders.map((order: any) => (
              <Fragment key={order.id}>
                <Table.Tr>
                  <Table.Td>{order.id.slice(0, 8)}</Table.Td>
                  <Table.Td>
                    {new Date(order.created_at).toLocaleDateString()}
                  </Table.Td>
                  <Table.Td>ETB {order.total_amount.toFixed(2)}</Table.Td>
                  <Table.Td>{order.payment_method.toUpperCase()}</Table.Td>
                  <Table.Td>
                    <Badge
                      color={
                        order.status === "PENDING"
                          ? "yellow"
                          : order.status === "PAID"
                          ? "green"
                          : "gray"
                      }
                    >
                      {order.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap={4}>
                      <Button
                        size="xs"
                        variant="subtle"
                        onClick={() => toggleRow(order.id)}
                        leftSection={
                          openedOrderId === order.id ? (
                            <IconChevronUp size={16} />
                          ) : (
                            <IconChevronDown size={16} />
                          )
                        }
                      >
                        Items
                      </Button>
                      <Button
                        size="xs"
                        variant="light"
                        onClick={() => router.push(`orders/${order.id}`)}
                      >
                        View
                      </Button>
                      {order.status === "PAID" && (
                        <Button
                          size="xs"
                          variant="light"
                          onClick={() =>
                            router.push(`orders/${order.id}/review`)
                          }
                        >
                          Review
                        </Button>
                      )}
                    </Group>
                  </Table.Td>
                </Table.Tr>

                <Table.Tr>
                  <Table.Td colSpan={6} style={{ padding: 0, border: "none" }}>
                    <Collapse in={openedOrderId === order.id}>
                      <Box p="md">
                        <Text fw={500} mb="sm">
                          Order Items
                        </Text>
                        <Table
                          withColumnBorders
                          striped
                          verticalSpacing="sm"
                          highlightOnHover
                          withTableBorder
                        >
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th>Title</Table.Th>
                              <Table.Th>Price</Table.Th>
                              <Table.Th>Quantity</Table.Th>
                              <Table.Th>Subtotal</Table.Th>
                            </Table.Tr>
                          </Table.Thead>
                          <Table.Tbody>
                            {order.items.map((item: any) => (
                              <Table.Tr key={item.id}>
                                <Table.Td>{item.artwork_title}</Table.Td>
                                <Table.Td>
                                  ETB {item.price_at_purchase.toFixed(2)}
                                </Table.Td>
                                <Table.Td>{item.quantity}</Table.Td>
                                <Table.Td>
                                  ETB{" "}
                                  {(
                                    item.price_at_purchase * item.quantity
                                  ).toFixed(2)}
                                </Table.Td>
                              </Table.Tr>
                            ))}
                          </Table.Tbody>
                        </Table>
                      </Box>
                    </Collapse>
                  </Table.Td>
                </Table.Tr>
              </Fragment>
            ))}
        </Table.Tbody>
      </Table>
      <Center mt="md">
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
