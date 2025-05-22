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
} from "@mantine/core";
import { IconBox, IconCheck, IconTruck, IconX } from "@tabler/icons-react";
import { useParams, useRouter } from "next/navigation";

const statusIconMap = {
  PENDING: <IconBox size={16} />,
  SHIPPED: <IconTruck size={16} />,
  COMPLETED: <IconCheck size={16} />,
  CANCELLED: <IconX size={16} />,
};

export default function AdminOrderDetailPage() {
  const router = useRouter();
  const { id } = useParams();

  const { data: order, isLoading } = useGetOrderByIdQuery(id as string);

  if (isLoading) return <Loader />;

  if (!order) return <Text>Order not found.</Text>;

  return (
    <Stack className="w-full">
      <Title order={2}>Order Details</Title>

      {/* Basic Info */}
      <Card withBorder>
        <Title order={4}>Order Information</Title>
        <Text>ID: {order.id}</Text>
        <Text>
          Status: <Badge>{order.status}</Badge>
        </Text>
        <Text>Total Amount: ${order.total_amount}</Text>
        <Text>Payment Method: {order.payment_method || "N/A"}</Text>
        <Text>Created At: {new Date(order.created_at).toLocaleString()}</Text>
        {order.expected_delivery && (
          <Text>
            Expected Delivery:{" "}
            {new Date(order.expected_delivery).toLocaleDateString()}
          </Text>
        )}
      </Card>

      {/* Buyer Info */}
      <Card withBorder>
        <Title order={4}>Buyer</Title>
        <Text>Username: {order.buyer?.username}</Text>
        <Text>Email: {order.buyer?.email}</Text>
      </Card>

      {/* Artist Info */}
      <Card withBorder>
        <Title order={4}>Artist</Title>
        <Text>Username: {order.artist?.username}</Text>
        <Text>Email: {order.artist?.email}</Text>
      </Card>

      {/* Status Timeline */}
      {order.status_history?.length > 0 && (
        <Card withBorder>
          <Title order={4}>Status History</Title>
          <Timeline
            active={order.status_history.length - 1}
            bulletSize={24}
            lineWidth={2}
          >
            {order.status_history.map((entry: any, index: number) => (
              <Timeline.Item
                key={index}
                title={entry.status}
                bullet={statusIconMap[entry.status] || <IconBox size={16} />}
              >
                <Text size="sm" c="dimmed">
                  {new Date(entry.timestamp).toLocaleString()}
                </Text>
              </Timeline.Item>
            ))}
          </Timeline>
        </Card>
      )}

      <Group justify="flex-end">
        <Button variant="outline" onClick={() => router.back()}>
          Back
        </Button>
      </Group>
    </Stack>
  );
}
