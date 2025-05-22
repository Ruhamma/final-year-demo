"use client";
import {
  Grid,
  Card,
  Title,
  Text,
  Group,
  Stack,
  Badge,
  Skeleton,
  SimpleGrid,
  Paper,
  Box,
} from "@mantine/core";
import { AreaChart, DonutChart, BarChart } from "@mantine/charts";
import { useGetAdminAnalyticsQuery } from "@/store/api/admin/admin";
import {
  IconShoppingCart,
  IconUsers,
  IconUserPlus,
  IconReceipt2,
} from "@tabler/icons-react";
export default function AnalyticsDashboard() {
  const { data, isLoading, isError } = useGetAdminAnalyticsQuery();

  if (isLoading) return <Skeleton height={400} />;
  if (isError) return <Text c="red">Error loading analytics</Text>;

  return (
    <Stack gap="md" p="md" className="w-full">
      <Title order={2}>Art Marketplace Analytics</Title>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="md">
        <Card withBorder radius="md" p="sm">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="sm" c="dimmed">
                Total Sales
              </Text>
              <Title order={3}>
                ETB{data?.total_sales?.toLocaleString() || 0}
              </Title>
            </div>
            <IconShoppingCart size={24} color="var(--mantine-color-blue-6)" />
          </Group>
        </Card>

        <Card withBorder radius="md" p="sm">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="sm" c="dimmed">
                Total Orders
              </Text>
              <Title order={3}>{data?.total_orders_count}</Title>
            </div>
            <IconReceipt2 size={24} color="var(--mantine-color-green-6)" />
          </Group>
        </Card>

        <Card withBorder radius="md" p="sm">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="sm" c="dimmed">
                Active Artists
              </Text>
              <Title order={3}>{data?.active_users?.artists}</Title>
            </div>
            <IconUsers size={24} color="var(--mantine-color-violet-6)" />
          </Group>
        </Card>

        <Card withBorder radius="md" p="sm">
          <Group justify="space-between" align="flex-start">
            <div>
              <Text size="sm" c="dimmed">
                New Signups
              </Text>
              <Group gap="xs" mt={4}>
                <Badge
                  color="teal"
                  variant="light"
                  size="sm"
                  leftSection={<IconUserPlus size={12} />}
                >
                  BUYERS: {data?.new_signups?.buyers}
                </Badge>
                <Badge
                  color="indigo"
                  variant="light"
                  size="sm"
                  leftSection={<IconUserPlus size={12} />}
                >
                  ARTISTS: {data?.new_signups?.artists}
                </Badge>
              </Group>
            </div>
            <IconUserPlus size={24} color="var(--mantine-color-orange-6)" />
          </Group>
        </Card>
      </SimpleGrid>
      <Card withBorder radius="md" p="md" h="100%" className="h-[700px]">
        <Title order={3} mb="md">
          Artwork Insights
        </Title>

        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, lg: 12 }}>
            <Box h={300}>
              <Title
                className="font-semibold text-lg"
                c="gray"
                order={4}
                mb="sm"
              >
                Artwork Uploads
              </Title>
              {data?.artwork_uploads_over_time?.length > 0 ? (
                <AreaChart
                  h={450}
                  data={data.artwork_uploads_over_time}
                  dataKey="date"
                  series={[{ name: "count", color: "indigo.6" }]}
                  curveType="linear"
                  withDots
                  withGradient
                />
              ) : (
                <Text c="dimmed" ta="center" py={80}>
                  No upload data
                </Text>
              )}
            </Box>
          </Grid.Col>
        </Grid>
      </Card>

      <Stack h="100%">
        <Card withBorder p="sm" radius="md">
          <Title order={4} mb="sm">
            Revenue by Category
          </Title>
          {data?.revenue_by_category?.length > 0 ? (
            <DonutChart
              data={data.revenue_by_category.map((item) => ({
                name: item.category,
                value: item.revenue,
                color: "blue.6",
              }))}
              h={420}
              withLabels
            />
          ) : (
            <Text c="dimmed" ta="center" py={30}>
              No category data
            </Text>
          )}
        </Card>

        <Card withBorder p="sm" radius="md">
          <Title order={4} mb="sm">
            Revenue by Medium
          </Title>
          {data?.revenue_by_medium?.length > 0 ? (
            <BarChart
              h={220}
              data={data.revenue_by_medium}
              dataKey="medium"
              orientation="vertical"
              series={[{ name: "revenue", color: "teal.6" }]}
              withXAxis={false}
              withYAxis={false}
            />
          ) : (
            <Text c="dimmed" ta="center" py={30}>
              No medium data
            </Text>
          )}
        </Card>
        <Card withBorder p="sm" radius="md">
          <Title order={4} mb="sm">
            Revenue by Style
          </Title>
          {data?.revenue_by_style?.length > 0 ? (
            <DonutChart
              data={data.revenue_by_style.map((item) => ({
                name: item.style,
                value: item.revenue,
                color: "violet.6",
              }))}
              h={420}
              withLabels
            />
          ) : (
            <Text c="dimmed" ta="center" py={30}>
              No style data
            </Text>
          )}
        </Card>
      </Stack>

      <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
        <Card withBorder radius="md" p="md">
          <Title order={3} mb="md">
            Top Performers
          </Title>
          <Title order={4} mb="sm">
            Top Artworks
          </Title>
          <Stack gap="xs">
            {data?.top_artworks?.map((artwork) => (
              <Paper withBorder p="xs" key={artwork.id}>
                <Group justify="space-between">
                  <Text fw={500} lineClamp={1} size="sm">
                    {artwork.title || "Untitled"}
                  </Text>
                  <Group gap={4}>
                    <Badge variant="light" size="xs">
                      {artwork.total_sold} sold
                    </Badge>
                    <Text fw={600} size="sm">
                      ETB{artwork.total_revenue.toLocaleString()}
                    </Text>
                  </Group>
                </Group>
              </Paper>
            ))}
          </Stack>
        </Card>

        <Card withBorder radius="md" p="md">
          <Title order={4} mb="sm">
            Order Status
          </Title>
          <Box h={60}>
            {data?.order_status_breakdown && (
              <Badge
                color="orange"
                variant="light"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                PENDING: {data.order_status_breakdown.PENDING || 0}
              </Badge>
            )}
          </Box>

          <Title order={4} mt="xl" mb="sm">
            Pending Payouts
          </Title>
          <Group justify="space-between">
            <Title order={3}>
              ETB {data?.pending_payouts?.toLocaleString()}
            </Title>
            <Badge color="orange" variant="light">
              To be distributed
            </Badge>
          </Group>
        </Card>
      </SimpleGrid>
    </Stack>
  );
}
