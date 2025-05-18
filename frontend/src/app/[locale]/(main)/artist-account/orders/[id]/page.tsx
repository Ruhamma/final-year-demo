"use client";

import {
  Box,
  Text,
  Group,
  Card,
  Badge,
  Stack,
  Timeline,
  Image,
  Divider,
  Button,
  Select,
  Loader,
  Center,
  Title,
  ThemeIcon,
  ActionIcon,
  Drawer,
  Flex,
} from "@mantine/core";
import {
  IconClock,
  IconPackage,
  IconTruckDelivery,
  IconCheck,
  IconX,
  IconInfoCircle,
  IconMapPin,
  IconListDetails,
} from "@tabler/icons-react";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  useGetOrderByIdQuery,
  useUpdateOrderStatusMutation,
} from "@/store/api/order/order";
import { useDisclosure } from "@mantine/hooks";

const statusIcons = {
  PENDING: <IconClock size={16} />,
  PROCESSING: <IconPackage size={16} />,
  SHIPPED: <IconTruckDelivery size={16} />,
  COMPLETED: <IconCheck size={16} />,
  CANCELLED: <IconX size={16} />,
};

const statusColors = {
  PENDING: "yellow",
  PROCESSING: "blue",
  SHIPPED: "orange",
  COMPLETED: "green",
  CANCELLED: "red",
};

const statusOptions = [
  "PENDING",
  "PROCESSING",
  "SHIPPED",
  "COMPLETED",
  "CANCELLED",
];

export default function OrderDetailPage() {
  const [opened, { open, close }] = useDisclosure(false);
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);
  const [updateStatus, { isLoading: isUpdating }] =
    useUpdateOrderStatusMutation();
  const [newStatus, setNewStatus] = useState(null);

  if (isLoading) {
    return (
      <Center h="80vh">
        <Loader size="lg" />
      </Center>
    );
  }

  const handleStatusChange = async () => {
    if (newStatus && newStatus !== order?.status) {
      await updateStatus({ id, status: newStatus });
    }
  };

  return (
    <Box maw="1000px" mx="auto" p="md">
      <Group justify="space-between" mb="lg">
        <Stack gap={0}>
          <Group>
            <Title order={3}>Order #{order?.id.slice(0, 8)}</Title>
          </Group>
          <Badge color={statusColors[order?.status]}>{order?.status}</Badge>
        </Stack>
        <Group>
          <Select
            placeholder="Update Status"
            data={statusOptions}
            value={newStatus}
            onChange={setNewStatus}
            allowDeselect={false}
            disabled={isUpdating}
          />
          <Button
            onClick={handleStatusChange}
            loading={isUpdating}
            disabled={!newStatus || newStatus === order?.status}
          >
            Update
          </Button>
          <ActionIcon
            variant="light"
            color="green"
            onClick={open}
            size="lg"
            title="View Order Detail"
          >
            <IconListDetails size={20} />
          </ActionIcon>
        </Group>
      </Group>

      {order?.status === "SHIPPED" && (
        <Text mb="md" c="dimmed">
          Expected Delivery:{" "}
          <b>{new Date(order?.expected_delivery).toLocaleDateString()}</b>
        </Text>
      )}
      <Flex
        mb="lg"
        className="flex w-full justify-evenly gap-4 bg-brown-100 p-2 rounded-md items-stretch"
      >
        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="flex flex-col justify-between w-[500px]"
        >
          <Stack gap="xs">
            <Group>
              <ThemeIcon variant="light">
                <IconInfoCircle size={18} />
              </ThemeIcon>
              <Text size="lg" fw={600}>
                Order Info
              </Text>
            </Group>
            <Text c="dimmed">
              <b>Date:</b> {new Date(order?.created_at).toLocaleDateString()}
            </Text>
            <Text c="dimmed">
              <b>Buyer:</b> {order?.shipping_address?.first_name}{" "}
              {order?.shipping_address?.last_name} ({order?.buyer?.email})
            </Text>
            <Text c="dimmed">
              <b>Payment Method:</b> {order?.payment_method}
            </Text>
            <Text c="dimmed">
              <b>Total:</b>{" "}
              <Text span fw={600}>
                ETB {order?.total_amount?.toFixed(2)}
              </Text>
            </Text>
          </Stack>
        </Card>

        <Card
          shadow="sm"
          radius="md"
          withBorder
          className="flex flex-col justify-between w-[500px]"
        >
          <Stack gap="xs">
            <Group>
              <ThemeIcon variant="light" color="teal">
                <IconMapPin size={18} />
              </ThemeIcon>
              <Text size="lg" fw={600}>
                Shipping Address
              </Text>
            </Group>
            <Text c="dimmed">
              <b>Country:</b> {order?.shipping_address?.country}
            </Text>
            <Text c="dimmed">
              <b>Street:</b> {order?.shipping_address?.street}
            </Text>
            <Text c="dimmed">
              <b>City & Province:</b> {order?.shipping_address?.city},{" "}
              {order?.shipping_address?.province}
            </Text>
            <Text c="dimmed">
              <b>Zip Code:</b> {order?.shipping_address?.zip_code}
            </Text>
            {order?.shipping_address?.additional_info && (
              <Text c="dimmed">
                <b>Note:</b> {order?.shipping_address?.additional_info}
              </Text>
            )}
          </Stack>
        </Card>
      </Flex>
      <Text fw={600} mb="sm">
        Artworks
      </Text>
      <Stack gap="md">
        {order?.items?.map((item) => (
          <Card key={item?.artwork_id} withBorder shadow="xs">
            <Group align="flex-start">
              <Image src={item?.artwork_image} w={80} h={80} radius="md" />
              <Stack gap={2}>
                <Text fw={500}>{item?.artwork_title}</Text>
                <Text size="sm" c="dimmed">
                  Qty: {item?.quantity}
                </Text>
                <Text size="sm" c="dimmed">
                  Price: ETB {item?.price_at_purchase?.toFixed(2)}
                </Text>
              </Stack>
            </Group>
          </Card>
        ))}
      </Stack>
      <Drawer
        opened={opened}
        onClose={close}
        title={`Order #${order?.id?.slice(0, 8)}`}
        padding="md"
        size="md"
        position="right"
        overlayProps={{
          blur: 2,
          opacity: 0.3,
        }}
      >
        {isLoading ? (
          <Center h="60vh">
            <Loader />
          </Center>
        ) : (
          <div className="p-2">
            <Text fw={600} mt="lg" mb="md">
              Order Status Tracking
            </Text>
            <Timeline
              active={order?.status_history?.length - 1}
              bulletSize={24}
              lineWidth={2}
              mb="xl"
            >
              {order?.status_history?.map((entry, index) => (
                <Timeline.Item
                  bullet={statusIcons[entry.status]}
                  title={entry.status}
                  key={index}
                >
                  <Text size="sm" c="dimmed">
                    {new Date(entry.timestamp).toLocaleString()}
                  </Text>
                </Timeline.Item>
              ))}
            </Timeline>
          </div>
        )}
      </Drawer>
    </Box>
  );
}
