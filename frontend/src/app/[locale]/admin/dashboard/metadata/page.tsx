"use client";
import { useGetMetadataCountsQuery } from "@/store/api/admin/admin";
import {
  Card,
  Text,
  Badge,
  Button,
  Group,
  Loader,
  SimpleGrid,
  Center,
  Title,
  Stack,
  Divider,
} from "@mantine/core";
import {
  IconCategory,
  IconPalette,
  IconBrush,
  IconTags,
  IconDatabase,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const { data, error, isLoading } = useGetMetadataCountsQuery({});

  if (isLoading)
    return (
      <Center className="h-[70vh]">
        <Loader size="xl" />
      </Center>
    );
  if (error)
    return (
      <Center className="h-[70vh]">
        <Text c="red">Failed to load metadata counts.</Text>
      </Center>
    );

  const cards = [
    {
      label: "Categories",
      count: data?.categories ?? 0,
      icon: <IconCategory size={36} stroke={1.5} />,
      route: "/admin/dashboard/metadata/category",
      color: "green",
      description: "Manage artwork categories used in listings.",
    },
    {
      label: "Mediums",
      count: data?.mediums ?? 0,
      icon: <IconPalette size={36} stroke={1.5} />,
      route: "/admin/dashboard/metadata/medium",
      color: "green",
      description: "Define mediums like oil, acrylic, or digital.",
    },
    {
      label: "Styles",
      count: data?.styles ?? 0,
      icon: <IconBrush size={36} stroke={1.5} />,
      route: "/admin/dashboard/metadata/style",
      color: "green",
      description: "Organize art styles such as abstract or realism.",
    },
    {
      label: "Tags",
      count: data?.tags ?? 0,
      icon: <IconTags size={36} stroke={1.5} />,
      route: "/admin/dashboard/metadata/tag",
      color: "green",
      description: "Curate searchable tags for artworks.",
    },
  ];

  return (
    <div className="px-10 py-8">
      <Stack align="start" gap="xs" mb="xl">
        <Group gap="xs">
          <IconDatabase size={32} />
          <Title order={2}>Metadata Management</Title>
        </Group>
        <Text size="md" c="dimmed">
          View, edit, and organize artwork metadata such as categories, mediums,
          styles, and tags. These help users and artists classify and find
          artworks more efficiently.
        </Text>
        <Divider mt="sm" />
      </Stack>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xl">
        {cards.map(({ label, count, icon, route, color, description }) => (
          <Card
            key={label}
            shadow="md"
            padding="lg"
            radius="lg"
            withBorder
            className="hover:shadow-xl transition-all"
          >
            <Stack gap="sm">
              <Group ps="apart">
                <Group>
                  {icon}
                  <Text size="xl" fw={600}>
                    {label}
                  </Text>
                </Group>
                <Badge color={color} size="lg" variant="light">
                  {count}
                </Badge>
              </Group>
              <Text size="sm" c="dimmed">
                {description}
              </Text>
              <Button
                fullWidth
                variant="light"
                color={color}
                onClick={() => router.push(route)}
              >
                Manage {label}
              </Button>
            </Stack>
          </Card>
        ))}
      </SimpleGrid>
    </div>
  );
};
export default Page;
