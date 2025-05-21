"use client";
import { Card, Grid, Title, Text, Loader, Group, Badge } from "@mantine/core";
import { BarChart, PieChart } from "@mantine/charts";
import { useGetAdminAnalyticsQuery } from "@/store/api/admin/admin";

export default function AdminAnalyticsDashboard() {
  const { data, isLoading, isError } = useGetAdminAnalyticsQuery();

  if (isLoading) return <Loader variant="dots" />;
  if (isError || !data) return <Text c="red">Failed to load analytics.</Text>;

  const {
    total_sales,
    total_orders_count,
    active_users,
    new_signups,
    top_artworks,
    top_artists,
    artwork_uploads_over_time,
    order_status_breakdown,
    revenue_by_category,
    revenue_by_style,
    revenue_by_medium,
    pending_payouts,
    traffic_stats,
  } = data;

  return (
    <Grid gutter="lg">
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4}>Total Sales</Title>
          <Text size="xl" fw={700}>
            ${total_sales}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4}>Orders</Title>
          <Text size="xl" fw={700}>
            {total_orders_count}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4}>Pending Payouts</Title>
          <Text size="xl" fw={700}>
            ${pending_payouts}
          </Text>
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4} mb="sm">
            Order Status Breakdown
          </Title>
          <BarChart
            h={250}
            data={[
              {
                name: "Orders",
                ...order_status_breakdown,
              },
            ]}
            dataKey="name"
            withLegend
            series={Object.keys(order_status_breakdown).map((status) => ({
              name: status,
              color: "blue",
            }))}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4} mb="sm">
            Artwork Uploads Over Time
          </Title>
          <BarChart
            h={250}
            data={artwork_uploads_over_time.map((item) => ({
              name: item.date,
              Uploads: item.count,
            }))}
            dataKey="name"
            series={[{ name: "Uploads", color: "green" }]}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4} mb="xs">
            Revenue by Category
          </Title>
          <PieChart
            data={revenue_by_category.map((item) => ({
              name: item.category,
              value: item.revenue,
              color: "blue",
            }))}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4} mb="xs">
            Revenue by Style
          </Title>
          <PieChart
            data={revenue_by_style.map((item) => ({
              name: item.style,
              value: item.revenue,
              color: "orange",
            }))}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={{ base: 12, md: 4 }}>
        <Card withBorder shadow="sm">
          <Title order={4} mb="xs">
            Revenue by Medium
          </Title>
          <PieChart
            data={revenue_by_medium.map((item) => ({
              name: item.medium,
              value: item.revenue,
              color: "teal",
            }))}
          />
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4}>Top Artworks</Title>
          {top_artworks.map((art) => (
            <Group key={art.id} gap={2} my="xs">
              <Text>{art.title}</Text>
              <Badge color="blue">
                Sold: {art.total_sold} (${art.total_revenue})
              </Badge>
            </Group>
          ))}
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4}>Top Artists</Title>
          {top_artists.map((artist) => (
            <Group key={artist.id} gap={2} my="xs">
              <Text>{artist.username ?? "Unnamed Artist"}</Text>
              <Badge color="grape">Revenue: ${artist.total_revenue}</Badge>
            </Group>
          ))}
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4}>User Stats</Title>
          <Group gap={2}>
            <Text>Active Buyers: {active_users.buyers}</Text>
            <Text>Active Artists: {active_users.artists}</Text>
            <Text>New Buyer Signups: {new_signups.buyers}</Text>
            <Text>New Artist Signups: {new_signups.artists}</Text>
          </Group>
        </Card>
      </Grid.Col>

      <Grid.Col span={12}>
        <Card withBorder shadow="sm">
          <Title order={4}>Traffic</Title>
          <Text size="lg">
            Visits in Last 30 Days: {traffic_stats.last_30_days_visits}
          </Text>
        </Card>
      </Grid.Col>
    </Grid>
  );
}
