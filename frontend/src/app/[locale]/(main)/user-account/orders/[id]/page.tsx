"use client";

import {
  Box,
  Text,
  Group,
  Divider,
  Table,
  Stack,
  Paper,
  Title,
  Center,
  Loader,
  Image,
  Modal,
  Button,
} from "@mantine/core";
import {
  useCreatePaymentMutation,
  useGetOrderByIdQuery,
} from "@/store/api/order/order";
import { useParams } from "next/navigation";
import { IconReceipt, IconBarcode } from "@tabler/icons-react";
import { useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { notify } from "@/shared/components/notification/notification";

const OrderDetailPage = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useGetOrderByIdQuery(id);
  const [opened, { open, close }] = useDisclosure(false);
  const [modalImageSrc, setModalImageSrc] = useState<string | null>(null);
  const [startPayment, { isLoading: isLoadingPayment }] =
    useCreatePaymentMutation();
  if (isLoading || !order) {
    return (
      <Center h="100vh">
        <Loader size="lg" />
      </Center>
    );
  }
  const handleImageClick = (src: string) => {
    setModalImageSrc(src);
    open();
  };

  const handlePayment = async () => {
    try {
      const response = await startPayment(id).unwrap();
      notify("Success", "Payment started");
      window.location.href = response.checkout_url;
    } catch {
      notify("Error", "Failed to start payment");
    }
  };
  return (
    <Center p="md">
      <Box>
        <Paper
          radius="md"
          withBorder
          p="lg"
          w="100%"
          maw="700px"
          style={{
            fontFamily: "monospace",
            backgroundColor: "#fff",
            borderStyle: "dashed",
            borderColor: "#ccc",
          }}
          shadow="sm"
        >
          <Group justify="center" mb="sm">
            <IconReceipt size={28} />
            <Title order={3}>Order Receipt</Title>
          </Group>

          <Text className="text-center" size="xs" c="dimmed" mb="md">
            Thank you for your purchase!
          </Text>

          <Divider variant="dotted" />

          <Stack gap={4} mt="md" mb="md">
            <Group justify="space-between">
              <Text size="sm" className="font-bold">
                Order ID
              </Text>
              <Text size="sm">{order.id.slice(0, 8)}</Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" className="font-bold">
                Date
              </Text>
              <Text size="sm">
                {new Date(order.created_at).toLocaleString()}
              </Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" className="font-bold">
                Payment
              </Text>
              <Text size="sm">{order.payment_method.toUpperCase()}</Text>
            </Group>

            <Group justify="space-between">
              <Text size="sm" className="font-bold">
                Status
              </Text>
              <Text size="sm">{order.status}</Text>
            </Group>
          </Stack>

          <Divider variant="dotted" mb="sm" />

          <Text size="sm" fw={600} mb="xs">
            Items:
          </Text>

          <Table verticalSpacing="xs" fs="xs" withColumnBorders>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>Image</Table.Th>
                <Table.Th>Title</Table.Th>
                <Table.Th>Qty</Table.Th>
                <Table.Th>Price</Table.Th>
                <Table.Th>Subtotal</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {order.items.map((item) => (
                <Table.Tr key={item.id}>
                  <Table.Td>
                    {item.artwork_image ? (
                      <Image
                        src={item.artwork_image}
                        alt={item.artwork_title}
                        style={{ cursor: "pointer", objectFit: "cover" }}
                        onClick={() => handleImageClick(item.artwork_image)}
                        radius="sm"
                        className="w-[50px] h-[50px]"
                      />
                    ) : (
                      <Text size="xs" color="dimmed">
                        No Image
                      </Text>
                    )}
                  </Table.Td>
                  <Table.Td>{item.artwork_title}</Table.Td>
                  <Table.Td>{item.quantity}</Table.Td>
                  <Table.Td>ETB {item.price_at_purchase.toFixed(2)}</Table.Td>
                  <Table.Td>
                    ETB {(item.price_at_purchase * item.quantity).toFixed(2)}
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          <Divider variant="dotted" my="md" />

          <Group justify="space-between">
            <Text size="sm">Total:</Text>
            <Text size="sm" fw={700}>
              ETB {order.total_amount.toFixed(2)}
            </Text>
          </Group>

          <Divider variant="dotted" mt="md" />
          <Center mt="md">
            <Button onClick={handlePayment} loading={isLoadingPayment}>
              Process payment
            </Button>
          </Center>
          <Center mt="lg" style={{ opacity: 0.5 }}>
            <Group gap="xs">
              <IconBarcode size={48} />
              <Text size="xs" c="dimmed">
                Kuru — Visit again soon!
              </Text>
            </Group>
          </Center>
        </Paper>
        <Modal
          opened={opened}
          onClose={close}
          title="Artwork Image"
          size="lg"
          centered
        >
          {modalImageSrc && (
            <Image src={modalImageSrc} alt="Artwork" radius="md" />
          )}
        </Modal>
      </Box>
    </Center>
  );
};

export default OrderDetailPage;
