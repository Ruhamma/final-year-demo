"use client";
import {
  Card,
  Text,
  Group,
  ThemeIcon,
  Grid,
  Title,
  Badge,
  Table,
  Image,
  ScrollArea,
  SimpleGrid,
  Container,
  Timeline,
  Loader,
  Center,
  NumberFormatter,
  Box,
  Button,
} from "@mantine/core";
import {
  IconPackage,
  IconCash,
  IconBrush,
  IconHeart,
  IconEye,
  IconClock,
  IconTruckDelivery,
  IconCheck,
  IconX,
} from "@tabler/icons-react";
import { BarChart, PieChart } from "@mantine/charts";
import {
  useGetDashBoardHistoryQuery,
  useGetDashboardMetricsQuery,
  useGetDashboardTopFavoritedQuery,
} from "@/store/api/artist/profile";
import { useGetMyArtworksQuery } from "@/store/api/artwork/artwork";
import { useGetArtistOrdersQuery } from "@/store/api/order/order";
import { useRouter } from "next/navigation";
import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export default function ArtistDashboard() {
  const router = useRouter();
  const { data: orders, isLoading: isOrdersLoading } = useGetArtistOrdersQuery(
    {}
  );
  const { data: metrics, isLoading: loadingMetrics } =
    useGetDashboardMetricsQuery({});
  const { data: revenueHistory, isLoading: loadingHistory } =
    useGetDashBoardHistoryQuery({});
  const { data: topArtworks, isLoading: loadingFavorites } =
    useGetDashboardTopFavoritedQuery({});
  const { data, isLoading } = useGetMyArtworksQuery({});
  if (
    loadingMetrics ||
    loadingHistory ||
    loadingFavorites ||
    isLoading ||
    isOrdersLoading
  ) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }
  const recentOrders = (orders?.orders || [])
    .slice()
    .sort(
      (
        a: { created_at: string | number | Date },
        b: { created_at: string | number | Date }
      ) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 6);
  const statusHistory = recentOrders[0]?.status_history || [];
  const orderStatusData = Object.entries(metrics?.orders_by_status || {}).map(
    ([name, value]) => ({
      name,
      value: Number(value),
      color:
        name === "PENDING"
          ? "yellow.6"
          : name === "COMPLETED"
          ? "green.6"
          : name === "CANCELLED"
          ? "red.6"
          : name === "SHIPPED"
          ? "blue.6"
          : "gray.6",
    })
  );
  const statusColors = {
    PENDING: "green",
    PROCESSING: "blue",
    SHIPPED: "orange",
    COMPLETED: "green",
    CANCELLED: "red",
  };

  const statusIcons: { [key: string]: React.ReactNode } = {
    PENDING: <IconClock size={16} />,
    PROCESSING: <IconPackage size={16} />,
    SHIPPED: <IconTruckDelivery size={16} />,
    COMPLETED: <IconCheck size={16} />,
    CANCELLED: <IconX size={16} />,
  };

  function formatNumber(value: number) {
    if (value >= 1000) return (value / 1000).toFixed(1) + "K";
    return value;
  }
  return (
    <Container size="xl" py="md">
      <Title order={2} mb="lg">
        Artist Dashboard
      </Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg" mb="xl">
        <SummaryCard
          title="Total Orders"
          value={metrics?.total_orders}
          icon={<IconPackage />}
        />
        <SummaryCard
          title="Total Revenue"
          value={
            <NumberFormatter
              value={metrics?.total_revenue}
              thousandSeparator
              decimalScale={2}
              fixedDecimalScale
              prefix="ETB "
              className="text-sm"
            />
          }
          icon={<IconCash />}
        />
        <SummaryCard
          title="Total Artworks"
          value={data?.total}
          icon={<IconBrush />}
        />{" "}
        <SummaryCard
          title="Top Favorited"
          value={
            topArtworks?.reduce(
              (acc: any, a: { favorite_count: any }) =>
                acc + (a.favorite_count || 0),
              0
            ) ?? 0
          }
          icon={<IconHeart />}
        />
        <SummaryCard
          title="Total Views"
          value={formatNumber(
            data?.artworks?.reduce(
              (acc: any, a: { view_count: any }) => acc + (a.view_count || 0),
              0
            ) ?? 0
          )}
          icon={<IconEye />}
        />
      </SimpleGrid>

      <Grid gutter="xl" mb="xl">
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="lg">
            <Text fw={600} mb="sm">
              Monthly Revenue
            </Text>
            <BarChart
              h={200}
              data={revenueHistory || []}
              dataKey="month"
              series={[{ name: "revenue", color: "indigo.6" }]}
            />
          </Card>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 6 }}>
          <Card withBorder radius="md" p="lg">
            <Text fw={600} mb="sm">
              Order Status Breakdown
            </Text>
            <PieChart h={200} withTooltip data={orderStatusData} />
          </Card>
        </Grid.Col>
      </Grid>

      <Card withBorder radius="md" mb="xl">
        <Text fw={600} mb="md">
          Top Favorited Artworks
        </Text>
        <ScrollArea>
          <Group wrap="nowrap">
            {topArtworks?.map(
              (artwork: {
                id: Key | null | undefined;
                images: { url: any }[];
                title: string | number | null | undefined;
                favorite_count: any;
                view_count: any;
              }) => (
                <Card
                  key={artwork.id}
                  w={220}
                  shadow="sm"
                  radius="md"
                  withBorder
                >
                  <Image
                    src={
                      artwork.images?.[0]?.url || "https://placehold.co/300x200"
                    }
                    alt={"Artwork"}
                    radius="md"
                    className="h-[120px] w-[150px]"
                  />
                  <Text mt="xs" fw={600}>
                    {artwork.title}
                  </Text>
                  <Text size="sm" c="dimmed">
                    {artwork?.favorite_count || 0} favorites •{" "}
                    {artwork?.view_count || "?"} views
                  </Text>
                </Card>
              )
            )}
          </Group>
        </ScrollArea>
      </Card>
      <Card withBorder radius="md" mt="md" mb="md">
        <Text fw={600} mb="md">
          Latest Order Status
        </Text>

        <Timeline
          active={statusHistory?.length - 1}
          bulletSize={24}
          lineWidth={2}
          mb="xl"
        >
          {statusHistory?.map((entry: any, index: number) => (
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
      </Card>
      <Box>
        <Group justify="space-between" mb="md">
          <Text size="lg" fw={600}>
            Recent Orders
          </Text>
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push("/artist-account/orders")}
          >
            Show More
          </Button>
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
              <Table.Th>Payment</Table.Th>
              <Table.Th>Total</Table.Th>
              <Table.Th>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {recentOrders.map(
              (
                order: {
                  id: string;
                  created_at: string;
                  payment_method: string;
                  total_amount: number;
                  status: keyof typeof statusColors;
                },
                index: number
              ) => (
                <Table.Tr key={index}>
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
                      onClick={() =>
                        router.push(`/artist-account/orders/${order.id}`)
                      }
                    >
                      View
                    </Button>
                  </Table.Td>
                </Table.Tr>
              )
            )}
          </Table.Tbody>
        </Table>
      </Box>
    </Container>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: any;
  icon: React.ReactNode;
}) {
  return (
    <Card withBorder radius="md" p="md">
      <Group>
        <ThemeIcon variant="light" size="lg" radius="xl">
          {icon}
        </ThemeIcon>
        <div>
          <Text size="xs" c="dimmed">
            {title}
          </Text>
          <Text fw={700} size="lg">
            {value}
          </Text>
        </div>
      </Group>
    </Card>
  );
}
