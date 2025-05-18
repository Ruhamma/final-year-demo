"use client";
import { useAuth } from "@/context/useAuth";
import {
  useGetFavoritesQuery,
  useGetMetadataQuery,
} from "@/store/api/artwork/artwork";
import {
  Badge,
  Box,
  Button,
  Card,
  CardSection,
  Center,
  Divider,
  Group,
  Image,
  Loader,
  NumberFormatter,
  Pagination,
  Select,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useDebouncedValue } from "@mantine/hooks";
import {
  IconArrowRight,
  IconHeartBroken,
  IconSearch,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Page = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const limit = 12;
  const skip = (page - 1) * limit;
  const [search, setSearch] = useState("");
  const [debounced] = useDebouncedValue(search, 300);

  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    medium: "",
    style: "",
    category: "",
  });
  const { user } = useAuth();
  const { data: metadata } = useGetMetadataQuery({});

  const { data: favorites, isLoading } = useGetFavoritesQuery({
    skip,
    limit,
    search: debounced,
    price: selectedFilters.price,
    category: selectedFilters.category,
    medium: selectedFilters.medium,
    style: selectedFilters.style,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }

  const formattedDate = user?.created_at
    ? new Date(user.created_at).toLocaleString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
    : "";

  if (!favorites || favorites.length === 0) {
    return (
      <Center h="90vh">
        <Stack align="center" gap="xs">
          <IconHeartBroken size={48} stroke={1.5} color="gray" />
          <Text size="lg" c="dimmed">
            No Favorite artwork.
          </Text>
        </Stack>
      </Center>
    );
  }
  const artworks = favorites?.artworks || [];
  const total = favorites?.total || 0;
  const totalPages = Math.ceil(total / limit);
  const handleClear = () => {
    setSelectedFilters({ price: "", medium: "", style: "", category: "" });
  };
  return (
    <div>
      <Stack gap={10}>
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          className="mb-6 bg-[#fefae0]"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-800">
              Your Favorite Artworks
            </h2>
            <Badge size="lg" variant="light" color="teal" radius="sm">
              {total} total
            </Badge>
          </div>
          <Text size="sm" className="text-gray-600 mt-2">
            Browse the artworks you have marked as favorites.
          </Text>
          <div className="p-4">
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4">
              <Group gap="xs">
                <Select
                  placeholder="Price"
                  data={["Low to High", "High to Low"]}
                  value={selectedFilters.price}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      price: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Categories"
                  data={metadata?.categories.map((cat: any) => ({
                    value: cat.id,
                    label: cat.name,
                  }))}
                  value={selectedFilters.category}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      category: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Medium"
                  data={metadata?.media.map((medium: any) => ({
                    value: medium.id,
                    label: medium.name,
                  }))}
                  value={selectedFilters.medium}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      medium: val || "",
                    }))
                  }
                  className="w-32"
                />
                <Select
                  placeholder="Style"
                  data={metadata?.styles.map((style: any) => ({
                    value: style.id,
                    label: style.name,
                  }))}
                  value={selectedFilters.style}
                  onChange={(val) =>
                    setSelectedFilters((prev) => ({
                      ...prev,
                      style: val || "",
                    }))
                  }
                  className="w-32"
                />

                <Button variant="subtle" onClick={handleClear}>
                  Clear all
                </Button>
              </Group>

              <Group gap="xs">
                <TextInput
                  value={search}
                  onChange={(e) => setSearch(e.currentTarget.value)}
                  placeholder="Search"
                  leftSection={<IconSearch size={16} />}
                  className="mr-10"
                  classNames={{
                    input:
                      "bg-transparent border-b border-gray-400 rounded-none focus:border-black focus:ring-0",
                  }}
                />
              </Group>
            </div>
          </div>
        </Card>
      </Stack>
      <Divider />

      <Center className="py-10 mx-auto flex flex-col gap-6">
        <Box className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {artworks.map((item) => (
            <Card
              key={item.id}
              shadow="sm"
              radius="md"
              withBorder
              className="bg-red-900"
            >
              <CardSection>
                <Image src={item?.images[0]?.url} alt={item?.title} />
              </CardSection>
              <Group className="py-2" justify="space-between" align="center">
                <p className="text-sm font-semibold">{item?.title}</p>
                <IconArrowRight
                  className="cursor-pointer text-gray-500 hover:text-gray-700"
                  size={16}
                  stroke={1.5}
                  onClick={() => router.push(`/art-page/${item?.id}`)}
                />
              </Group>
              <Text c="dimmed" className="text-xs font-semibold" size="xs">
                {item?.artist?.user?.username}
              </Text>
              <Text className="text-xs font-semibold" size="xs">
                <Text size="sm">
                  <NumberFormatter
                    value={item?.price}
                    thousandSeparator
                    decimalScale={2}
                    fixedDecimalScale
                    prefix={"ETB "}
                    className="text-sm"
                  />
                </Text>
              </Text>
            </Card>
          ))}
        </Box>
        <Pagination
          value={page}
          onChange={setPage}
          total={totalPages}
          siblings={1}
          boundaries={1}
        />
      </Center>
    </div>
  );
};

export default Page;
