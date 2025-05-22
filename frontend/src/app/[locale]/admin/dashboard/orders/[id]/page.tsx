"use client";
import { useGetOrderByIdQuery } from "@/store/api/admin/admin";
import {
  Stack,
  Title,
  Card,
  Text,
  Badge,
  Group,
  Loader,
  Timeline,
  Button,
  Image,
  Grid,
  Paper,
  Avatar,
  Divider,
  Box,
} from "@mantine/core";
import {
  IconBox,
  IconCheck,
  IconTruck,
  IconX,
  IconMapPin,
  IconCalendar,
  IconCreditCard,
  IconUser,
  IconBrush,
} from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

const statusIconMap = {
  PENDING: <IconBox size={16} />,
  SHIPPED: <IconTruck size={16} />,
  COMPLETED: <IconCheck size={16} />,
  CANCELLED: <IconX size={16} />,
  FEEDING: <IconTruck size={16} />,
};

const statusColorMap = {
  PENDING: "yellow",
  SHIPPED: "blue",
  COMPLETED: "green",
  CANCELLED: "red",
  FEEDING: "orange",
};

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data: order, isLoading } = useGetOrderByIdQuery(id as string);

  if (isLoading) return <Loader size="xl" className="mx-auto my-8" />;

  if (!order) return <Text className="text-center my-8">Order not found.</Text>;

  return (
    <div className="max-w-6xl mx-auto p-4">
      <Group justify="space-between" mb="xl">
        <Title order={2} className="text-3xl font-bold text-gray-800">
          Order #{order.id.slice(0, 8).toUpperCase()}
        </Title>
        <Button variant="outline" onClick={() => router.back()}>
          Back to Orders
        </Button>
      </Group>

      <Grid gutter="xl">
        {/* Left Column - Order Summary */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder shadow="sm" radius="md" mb="md">
            <Title order={3} mb="md" className="flex items-center gap-2">
              <IconBrush size={24} />
              Artworks Ordered
            </Title>

            <Stack gap="sm">
              {order.items.map((item: any) => (
                <Paper key={item.id} withBorder p="md" radius="sm">
                  <Group wrap="nowrap" align="flex-start">
                    <Image
                      src={item.artwork_image}
                      alt={item.artwork_title}
                      radius="sm"
                      className="border w-[80px] h-[80px] object-cover"
                    />
                    <div className="flex-1">
                      <Text fw={500}>{item.artwork_title}</Text>
                    </div>
                    <Text fw={500}>
                      ETB {item.price_at_purchase.toLocaleString()}
                    </Text>
                  </Group>
                </Paper>
              ))}
            </Stack>

            <Divider my="lg" />

            <Group justify="space-between" mt="sm">
              <Text size="xl" fw={600}>
                Total Amount
              </Text>
              <Text size="xl" fw={700}>
                ETB {order.total_amount.toLocaleString()}
              </Text>
            </Group>
          </Card>

          {/* Shipping Address */}
          <Card withBorder shadow="sm" radius="md" mb="md">
            <Title order={3} mb="md" className="flex items-center gap-2">
              <IconMapPin size={24} />
              Delivery Information
            </Title>

            <Box p="sm" bg="gray.0" style={{ borderRadius: "8px" }}>
              <Text fw={500}>
                {order.shipping_address.first_name}{" "}
                {order.shipping_address.last_name}
              </Text>
              <Text>{order.shipping_address.street}</Text>
              <Text>
                {order.shipping_address.city}, {order.shipping_address.province}{" "}
                {order.shipping_address.zip_code}
              </Text>
              <Text>{order.shipping_address.country}</Text>
              <Text mt="sm">Phone: {order.shipping_address.phone_number}</Text>
              {order.shipping_address.additional_info && (
                <Text mt="sm">
                  Notes: {order.shipping_address.additional_info}
                </Text>
              )}
            </Box>
          </Card>
        </Grid.Col>

        {/* Right Column - Order Metadata */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Card withBorder shadow="sm" radius="md" mb="md">
            <Title order={3} mb="md" className="flex items-center gap-2">
              <IconCalendar size={24} />
              Order Summary
            </Title>

            <Stack gap="sm">
              <Group justify="space-between">
                <Text c="dimmed">Order Status</Text>
                <Badge
                  color={statusColorMap[order.status] || "gray"}
                  variant="light"
                  size="lg"
                  leftSection={
                    statusIconMap[order.status] || <IconBox size={14} />
                  }
                >
                  {order.status}
                </Badge>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Order Date</Text>
                <Text>{new Date(order.created_at).toLocaleString()}</Text>
              </Group>

              <Group justify="space-between">
                <Text c="dimmed">Payment Method</Text>
                <Text className="capitalize">
                  {order.payment_method.replace(/_/g, " ")}
                </Text>
              </Group>
            </Stack>
          </Card>

          {/* Buyer & Artist Info */}
          <Card withBorder shadow="sm" radius="md" mb="md">
            <Title order={3} mb="md" className="flex items-center gap-2">
              <IconUser size={24} />
              Customer Information
            </Title>

            <Stack gap="md">
              <div>
                <Text fw={500} mb="xs">
                  Buyer
                </Text>
                <Group gap="sm">
                  <Avatar color="blue" radius="xl">
                    {order.buyer?.username?.charAt(0).toUpperCase()}
                  </Avatar>
                  <div>
                    <Text fw={500}>{order.buyer?.username}</Text>
                    <Text size="sm" c="dimmed">
                      {order.buyer?.email}
                    </Text>
                  </div>
                </Group>
              </div>

              {order.artist && (
                <div>
                  <Text fw={500} mb="xs">
                    Artist
                  </Text>
                  <Group gap="sm">
                    <Avatar color="orange" radius="xl">
                      {order.artist?.username?.charAt(0).toUpperCase()}
                    </Avatar>
                    <div>
                      <Text fw={500}>{order.artist?.username}</Text>
                      <Text size="sm" c="dimmed">
                        {order.artist?.email}
                      </Text>
                    </div>
                  </Group>
                </div>
              )}
            </Stack>
          </Card>

          <Card withBorder shadow="sm" radius="md">
            <Title order={3} mb="md" className="flex items-center gap-2">
              <IconTruck size={24} />
              Order Timeline
            </Title>

            {order.status_history?.length > 0 ? (
              <Timeline
                active={order.status_history.length - 1}
                bulletSize={24}
                lineWidth={2}
              >
                {order.status_history.map((entry: any, index: number) => (
                  <Timeline.Item
                    key={index}
                    title={entry.status}
                    bullet={
                      statusIconMap[entry.status] || <IconBox size={16} />
                    }
                  >
                    <Text size="sm" c="dimmed">
                      {new Date(entry.timestamp).toLocaleString()}
                    </Text>
                    {entry.note && (
                      <Text size="sm" c="dimmed" mt={4}>
                        Note: {entry.note}
                      </Text>
                    )}
                  </Timeline.Item>
                ))}
              </Timeline>
            ) : (
              <Text c="dimmed" ta="center" py="md">
                No status history available
              </Text>
            )}
          </Card>
        </Grid.Col>
      </Grid>
    </div>
  );
}
