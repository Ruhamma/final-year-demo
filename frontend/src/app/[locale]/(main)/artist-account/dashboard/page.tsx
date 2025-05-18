// "use client";
// import {
//   Card,
//   Text,
//   Group,
//   ThemeIcon,
//   Grid,
//   Title,
//   Badge,
//   Table,
//   Image,
//   ScrollArea,
//   SimpleGrid,
//   Container,
//   Timeline,
// } from "@mantine/core";
// import {
//   IconPackage,
//   IconCash,
//   IconBrush,
//   IconHeart,
//   IconEye,
// } from "@tabler/icons-react";
// import { BarChart, PieChart } from "@mantine/charts";

// export default function ArtistDashboard() {
//   return (
//     <Container size="xl" py="md">
//       <Title order={2} mb="lg">
//         Artist Dashboard
//       </Title>

//       {/* Summary Cards */}
//       <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg" mb="xl">
//         <SummaryCard title="Total Orders" value="128" icon={<IconPackage />} />
//         <SummaryCard
//           title="Total Revenue"
//           value="ETB 25,000"
//           icon={<IconCash />}
//         />
//         <SummaryCard title="Artworks" value="34" icon={<IconBrush />} />
//         <SummaryCard title="Favorites" value="560" icon={<IconHeart />} />
//         <SummaryCard title="Total Views" value="10.2K" icon={<IconEye />} />
//       </SimpleGrid>

//       {/* Charts */}
//       <Grid gutter="xl" mb="xl">
//         <Grid.Col span={{ base: 12, md: 6 }}>
//           <Card withBorder radius="md" p="lg">
//             <Text fw={600} mb="sm">
//               Monthly Revenue
//             </Text>
//             <BarChart
//               h={200}
//               data={[
//                 { month: "Jan", revenue: 1200 },
//                 { month: "Feb", revenue: 2300 },
//                 { month: "Mar", revenue: 1850 },
//               ]}
//               dataKey="month"
//               series={[{ name: "revenue", color: "indigo.6" }]}
//             />
//           </Card>
//         </Grid.Col>
//         <Grid.Col span={{ base: 12, md: 6 }}>
//           <Card withBorder radius="md" p="lg">
//             <Text fw={600} mb="sm">
//               Order Status Breakdown
//             </Text>
//             <PieChart
//               h={200}
//               withTooltip
//               data={[
//                 { name: "Pending", value: 20, color: "yellow.6" },
//                 { name: "Completed", value: 50, color: "green.6" },
//                 { name: "Cancelled", value: 10, color: "red.6" },
//                 { name: "Shipped", value: 18, color: "blue.6" },
//               ]}
//             />
//           </Card>
//         </Grid.Col>
//       </Grid>

//       {/* Top Favorited Artworks */}
//       <Card withBorder radius="md" mb="xl">
//         <Text fw={600} mb="md">
//           Top Favorited Artworks
//         </Text>
//         <ScrollArea>
//           <Group wrap="nowrap">
//             {[1, 2, 3].map((item) => (
//               <Card key={item} w={220} shadow="sm" radius="md" withBorder>
//                 <Image
//                   src="https://placehold.co/300x200"
//                   height={120}
//                   alt="Artwork"
//                   radius="md"
//                 />
//                 <Text mt="xs" fw={600}>
//                   Artwork #{item}
//                 </Text>
//                 <Text size="sm" c="dimmed">
//                   120 favorites • 1.2K views
//                 </Text>
//               </Card>
//             ))}
//           </Group>
//         </ScrollArea>
//       </Card>

//       {/* Recent Orders */}
//       <Card withBorder radius="md" mb="xl">
//         <Text fw={600} mb="md">
//           Recent Orders
//         </Text>
//         <Table.ScrollContainer minWidth={600}>
//           <Table striped withTableBorder withColumnBorders>
//             <Table.Thead>
//               <Table.Tr>
//                 <Table.Th>Buyer</Table.Th>
//                 <Table.Th>Artwork</Table.Th>
//                 <Table.Th>Date</Table.Th>
//                 <Table.Th>Status</Table.Th>
//                 <Table.Th>Total</Table.Th>
//               </Table.Tr>
//             </Table.Thead>
//             <Table.Tbody>
//               {[1, 2].map((i) => (
//                 <Table.Tr key={i}>
//                   <Table.Td>Jane Doe</Table.Td>
//                   <Table.Td>Blue Night Sky</Table.Td>
//                   <Table.Td>2024-05-16</Table.Td>
//                   <Table.Td>
//                     <Badge color="blue">Shipped</Badge>
//                   </Table.Td>
//                   <Table.Td>ETB 1,200</Table.Td>
//                 </Table.Tr>
//               ))}
//             </Table.Tbody>
//           </Table>
//         </Table.ScrollContainer>
//       </Card>

//       {/* Order Status Timeline */}
//       <Card withBorder radius="md">
//         <Text fw={600} mb="md">
//           Latest Order Status
//         </Text>
//         <Timeline active={2} bulletSize={24} lineWidth={2}>
//           <Timeline.Item title="Order Placed" />
//           <Timeline.Item title="Processing" />
//           <Timeline.Item title="Shipped" />
//           <Timeline.Item title="Delivered" />
//         </Timeline>
//       </Card>
//     </Container>
//   );
// }

// function SummaryCard({ title, value, icon }) {
//   return (
//     <Card withBorder radius="md" p="md">
//       <Group>
//         <ThemeIcon variant="light" size="lg" radius="xl">
//           {icon}
//         </ThemeIcon>
//         <div>
//           <Text size="xs" c="dimmed">
//             {title}
//           </Text>
//           <Text fw={700} size="lg">
//             {value}
//           </Text>
//         </div>
//       </Group>
//     </Card>
//   );
// }

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
} from "@mantine/core";
import {
  IconPackage,
  IconCash,
  IconBrush,
  IconHeart,
  IconEye,
} from "@tabler/icons-react";
import { BarChart, PieChart } from "@mantine/charts";
import {
  useGetDashBoardHistoryQuery,
  useGetDashboardMetricsQuery,
  useGetDashboardTopFavoritedQuery,
} from "@/store/api/artist/profile";

export default function ArtistDashboard() {
  const { data: metrics, isLoading: loadingMetrics } =
    useGetDashboardMetricsQuery({});
  const { data: revenueHistory, isLoading: loadingHistory } =
    useGetDashBoardHistoryQuery({});
  const { data: topArtworks, isLoading: loadingFavorites } =
    useGetDashboardTopFavoritedQuery({});

  if (loadingMetrics || loadingHistory || loadingFavorites) {
    return (
      <Center h="100vh">
        <Loader />
      </Center>
    );
  }

  const orderStatusData = Object.entries(metrics?.orders_by_status || {}).map(
    ([name, value]) => ({
      name,
      value,
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

  return (
    <Container size="xl" py="md">
      <Title order={2} mb="lg">
        Artist Dashboard
      </Title>

      {/* Summary Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 5 }} spacing="lg" mb="xl">
        <SummaryCard
          title="Total Orders"
          value={metrics?.total_orders}
          icon={<IconPackage />}
        />
        <SummaryCard
          title="Total Revenue"
          value={`ETB ${metrics?.total_revenue}`}
          icon={<IconCash />}
        />
        <SummaryCard title="Total Artworks" value="34" icon={<IconBrush />} />{" "}
        <SummaryCard
          title="Favorites"
          value={
            topArtworks?.reduce(
              (acc, a) => acc + (a.favorites_count || 0),
              0
            ) ?? 0
          }
          icon={<IconHeart />}
        />
        <SummaryCard title="Total Views" value="10.2K" icon={<IconEye />} />{" "}
      </SimpleGrid>

      {/* Charts */}
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

      {/* Top Favorited Artworks */}
      <Card withBorder radius="md" mb="xl">
        <Text fw={600} mb="md">
          Top Favorited Artworks
        </Text>
        <ScrollArea>
          <Group wrap="nowrap">
            {topArtworks?.map((artwork) => (
              <Card key={artwork.id} w={220} shadow="sm" radius="md" withBorder>
                <Image
                  src={
                    artwork.images?.[0]?.url || "https://placehold.co/300x200"
                  }
                  alt={artwork.title}
                  radius="md"
                  className="h-[120px] w-[150px]"
                />
                <Text mt="xs" fw={600}>
                  {artwork.title}
                </Text>
                <Text size="sm" c="dimmed">
                  {artwork.favorites_count || 0} favorites •{" "}
                  {artwork.views || "?"} views
                </Text>
              </Card>
            ))}
          </Group>
        </ScrollArea>
      </Card>

      {/* Optionally Add Recent Orders and Timeline */}
      {/* Add later when order list endpoint is ready */}
    </Container>
  );
}

function SummaryCard({ title, value, icon }) {
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
