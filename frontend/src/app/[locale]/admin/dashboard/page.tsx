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
  Center,
  Progress,
  ThemeIcon,
} from "@mantine/core";
import { AreaChart, DonutChart, BarChart } from "@mantine/charts";
import { useGetAdminAnalyticsQuery } from "@/store/api/admin/admin";
import {
  IconShoppingCart,
  IconUsers,
  IconUserPlus,
  IconReceipt2,
  IconChartAreaLine,
  IconChartPie,
  IconChartBar,
  IconStar,
  IconClock,
  IconCurrency,
  IconCalendar,
} from "@tabler/icons-react";

export default function AnalyticsDashboard() {
  const { data, isLoading, isError } = useGetAdminAnalyticsQuery();

  if (isLoading) return <Skeleton height={400} />;
  if (isError) return <Text c="red">Error loading analytics</Text>;

  // Color variables
  const colors = {
    sales: "blue.6",
    orders: "green.6",
    artists: "violet.6",
    signups: "orange.6",
    buyers: "teal.6",
    pending: "yellow.6",
    payouts: "red.6",
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <Group justify="space-between" mb="xl">
        <Title order={1} className="text-3xl font-bold text-gray-800">
          Marketplace Analytics
        </Title>
        <Badge
          variant="light"
          color="gray"
          leftSection={<IconCalendar size={14} />}
        >
          {new Date().toLocaleDateString()}
        </Badge>
      </Group>

      {/* Summary Cards */}
      <SimpleGrid cols={{ base: 1, sm: 2, md: 4 }} spacing="lg" mb="xl">
        <Card withBorder radius="lg" shadow="sm" padding="lg">
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" className="flex items-center gap-1">
                <IconShoppingCart size={16} /> Total Sales
              </Text>
              <Title order={2} mt={4} className="text-2xl">
                ETB{data?.total_sales?.toLocaleString() || 0}
              </Title>
              <Progress
                value={100}
                color={colors.sales}
                size="sm"
                mt="md"
                animated
              />
            </div>
            <ThemeIcon
              size={48}
              radius="md"
              color={colors.sales}
              variant="light"
            >
              <IconCurrency size={24} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card withBorder radius="lg" shadow="sm" padding="lg">
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" className="flex items-center gap-1">
                <IconReceipt2 size={16} /> Total Orders
              </Text>
              <Title order={2} mt={4} className="text-2xl">
                {data?.total_orders_count}
              </Title>
              <Progress
                value={100}
                color={colors.orders}
                size="sm"
                mt="md"
                animated
              />
            </div>
            <ThemeIcon
              size={48}
              radius="md"
              color={colors.orders}
              variant="light"
            >
              <IconReceipt2 size={24} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card withBorder radius="lg" shadow="sm" padding="lg">
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" className="flex items-center gap-1">
                <IconUsers size={16} /> Active Artists
              </Text>
              <Title order={2} mt={4} className="text-2xl">
                {data?.active_users?.artists}
              </Title>
              <Progress
                value={100}
                color={colors.artists}
                size="sm"
                mt="md"
                animated
              />
            </div>
            <ThemeIcon
              size={48}
              radius="md"
              color={colors.artists}
              variant="light"
            >
              <IconUsers size={24} />
            </ThemeIcon>
          </Group>
        </Card>

        <Card withBorder radius="lg" shadow="sm" padding="lg">
          <Group justify="space-between">
            <div>
              <Text size="sm" c="dimmed" className="flex items-center gap-1">
                <IconUserPlus size={16} /> New Signups
              </Text>
              <Group gap={6} mt={4}>
                <Badge
                  color="teal"
                  variant="light"
                  size="md"
                  leftSection={<IconUserPlus size={12} />}
                >
                  {data?.new_signups?.buyers} Buyers
                </Badge>
                <Badge
                  color="indigo"
                  variant="light"
                  size="md"
                  leftSection={<IconUserPlus size={12} />}
                >
                  {data?.new_signups?.artists} Artists
                </Badge>
              </Group>
              <Progress
                value={100}
                color={colors.signups}
                size="sm"
                mt="md"
                animated
              />
            </div>
            <ThemeIcon
              size={48}
              radius="md"
              color={colors.signups}
              variant="light"
            >
              <IconUserPlus size={24} />
            </ThemeIcon>
          </Group>
        </Card>
      </SimpleGrid>

      {/* Main Charts Section */}
      <Grid gutter="xl" mb="xl">
        {/* Artwork Uploads */}
        <Grid.Col span={{ base: 12, lg: 8 }}>
          <Card withBorder radius="lg" shadow="sm" h="100%">
            <Group justify="space-between" mb="md">
              <Title order={3} className="flex items-center gap-2">
                <IconChartAreaLine size={24} />
                Artwork Uploads Over Time
              </Title>
              <Badge variant="light" color="indigo">
                Last 30 Days
              </Badge>
            </Group>
            {data?.artwork_uploads_over_time?.length > 0 ? (
              <AreaChart
                h={300}
                data={data.artwork_uploads_over_time}
                dataKey="date"
                series={[{ name: "count", color: "indigo.6" }]}
                curveType="linear"
                withDots
                withGradient
                withTooltip
                tooltipAnimationDuration={200}
                gridAxis="x"
              />
            ) : (
              <Center h={300}>
                <Text c="dimmed">No upload data available</Text>
              </Center>
            )}
          </Card>
        </Grid.Col>

        {/* Revenue by Category */}
        <Grid.Col span={{ base: 12, lg: 4 }}>
          <Card withBorder radius="lg" shadow="sm" h="100%">
            <Group justify="space-between" mb="md">
              <Title order={3} className="flex items-center gap-2">
                <IconChartPie size={24} />
                Revenue by Category
              </Title>
            </Group>
            {data?.revenue_by_category?.length > 0 ? (
              <DonutChart
                data={data.revenue_by_category.map((item: any) => ({
                  name: item.category,
                  value: item.revenue,
                  color: "blue.6",
                }))}
                h={300}
                withLabels
                withTooltip
                tooltipAnimationDuration={200}
              />
            ) : (
              <Center h={300}>
                <Text c="dimmed">No category data available</Text>
              </Center>
            )}
          </Card>
        </Grid.Col>

        {/* Revenue by Medium */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card withBorder radius="lg" shadow="sm">
            <Group justify="space-between" mb="md">
              <Title order={3} className="flex items-center gap-2">
                <IconChartBar size={24} />
                Revenue by Medium
              </Title>
            </Group>
            {data?.revenue_by_medium?.length > 0 ? (
              <BarChart
                h={300}
                data={data.revenue_by_medium}
                dataKey="medium"
                orientation="vertical"
                series={[{ name: "revenue", color: "teal.6" }]}
                withTooltip
                tooltipAnimationDuration={200}
                gridAxis="none"
              />
            ) : (
              <Center h={300}>
                <Text c="dimmed">No medium data available</Text>
              </Center>
            )}
          </Card>
        </Grid.Col>

        {/* Revenue by Style */}
        <Grid.Col span={{ base: 12, lg: 6 }}>
          <Card withBorder radius="lg" shadow="sm">
            <Group justify="space-between" mb="md">
              <Title order={3} className="flex items-center gap-2">
                <IconChartPie size={24} />
                Revenue by Style
              </Title>
            </Group>
            {data?.revenue_by_style?.length > 0 ? (
              <DonutChart
                data={data.revenue_by_style.map((item: any) => ({
                  name: item.style,
                  value: item.revenue,
                  color: "violet.6",
                }))}
                h={300}
                withLabels
                withTooltip
                tooltipAnimationDuration={200}
              />
            ) : (
              <Center h={300}>
                <Text c="dimmed">No style data available</Text>
              </Center>
            )}
          </Card>
        </Grid.Col>
      </Grid>

      {/* Bottom Section */}
      <Grid gutter="xl">
        {/* Top Performers */}
        <Grid.Col span={{ base: 12, md: 8 }}>
          <Card withBorder radius="lg" shadow="sm">
            <Group justify="space-between" mb="md">
              <Title order={3} className="flex items-center gap-2">
                <IconStar size={24} />
                Top Performing Artworks
              </Title>
              <Badge variant="light" color="yellow">
                By Revenue
              </Badge>
            </Group>
            <Stack gap="sm">
              {data?.top_artworks?.map((artwork: any, index: any) => (
                <Paper
                  key={artwork.id}
                  withBorder
                  p="md"
                  radius="md"
                  className="hover:bg-gray-50 transition-colors"
                >
                  <Group justify="space-between">
                    <Group gap="sm">
                      <Badge variant="light" color="gray">
                        #{index + 1}
                      </Badge>
                      <Text fw={500} lineClamp={1}>
                        {artwork.title || "Untitled"}
                      </Text>
                    </Group>
                    <Group gap={6}>
                      <Badge variant="light" color="blue" size="sm">
                        {artwork.total_sold} sold
                      </Badge>
                      <Text fw={600} c="green">
                        ETB{artwork.total_revenue.toLocaleString()}
                      </Text>
                    </Group>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Card>
        </Grid.Col>

        {/* Order Status & Payouts */}
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack h="100%">
            <Card withBorder radius="lg" shadow="sm">
              <Title order={3} mb="md" className="flex items-center gap-2">
                <IconClock size={24} />
                Order Status
              </Title>
              <Box
                p="md"
                bg="yellow.0"
                style={{ borderRadius: "var(--mantine-radius-md)" }}
              >
                <Group justify="space-between">
                  <Text fw={500}>Pending Orders</Text>
                  <Badge color="yellow" variant="filled" size="lg">
                    {data?.order_status_breakdown?.PENDING || 0}
                  </Badge>
                </Group>
              </Box>
            </Card>

            <Card withBorder radius="lg" shadow="sm">
              <Title order={3} mb="md" className="flex items-center gap-2">
                <IconCurrency size={24} />
                Pending Payouts
              </Title>
              <Box
                p="md"
                bg="red.0"
                style={{ borderRadius: "var(--mantine-radius-md)" }}
              >
                <Group justify="space-between">
                  <Text fw={500}>Total Amount</Text>
                  <Title order={3} c="red">
                    ETB {data?.pending_payouts?.toLocaleString()}
                  </Title>
                </Group>
                <Text size="sm" c="dimmed" mt="sm">
                  To be distributed to artists
                </Text>
              </Box>
            </Card>
          </Stack>
        </Grid.Col>
      </Grid>
    </div>
  );
}
